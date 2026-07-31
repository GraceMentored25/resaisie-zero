const numberFr = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 1,
});

function asPositiveNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new TypeError(`${label} doit être un nombre strictement positif.`);
  }
  return number;
}

function normalizeField(value) {
  return String(value ?? "").trim().toLocaleLowerCase("fr-FR");
}

function normalizedSteps(steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new TypeError("Le parcours doit contenir au moins une étape.");
  }

  return steps.map((step, index) => {
    const fields = [
      ...new Set((Array.isArray(step.fields) ? step.fields : []).map(normalizeField)),
    ].filter(Boolean);

    return {
      name: String(step.name || `Étape ${index + 1}`).trim(),
      tool: String(step.tool || "Outil non précisé").trim(),
      fields,
    };
  });
}

export function analyzeWorkflow(workflow) {
  const runsPerMonth = asPositiveNumber(
    workflow?.runsPerMonth,
    "La fréquence mensuelle",
  );
  const hourlyCost = asPositiveNumber(workflow?.hourlyCost, "Le coût horaire");
  const minutesPerCopy = asPositiveNumber(
    workflow?.minutesPerCopy,
    "La durée d’une ressaisie",
  );
  const steps = normalizedSteps(workflow?.steps);
  const seen = new Set();
  const copiesByField = new Map();
  let priority = null;

  steps.forEach((step, stepIndex) => {
    const duplicatedHere = step.fields.filter((field) => seen.has(field));

    duplicatedHere.forEach((field) => {
      copiesByField.set(field, (copiesByField.get(field) || 0) + 1);
    });

    if (
      stepIndex > 0 &&
      (!priority || duplicatedHere.length > priority.score)
    ) {
      priority = {
        stepIndex,
        from: steps[stepIndex - 1].name,
        to: step.name,
        duplicatedFields: duplicatedHere,
        score: duplicatedHere.length,
      };
    }

    step.fields.forEach((field) => seen.add(field));
  });

  const duplicateCopiesPerRun = [...copiesByField.values()].reduce(
    (total, copies) => total + copies,
    0,
  );
  const minutesSavedPerYear =
    duplicateCopiesPerRun * minutesPerCopy * runsPerMonth * 12;
  const hoursSavedPerYear = minutesSavedPerYear / 60;
  const costSavedPerYear = hoursSavedPerYear * hourlyCost;
  const duplicateFields = [...copiesByField.entries()]
    .map(([field, copies]) => ({ field, copies }))
    .sort(
      (left, right) =>
        right.copies - left.copies || left.field.localeCompare(right.field, "fr"),
    );

  return {
    duplicateCopiesPerRun,
    duplicateFields,
    minutesSavedPerYear,
    hoursSavedPerYear,
    costSavedPerYear,
    priority: priority?.score ? priority : null,
  };
}

export function buildMarkdownReport(workflow, analysis) {
  const priority = analysis.priority
    ? `${analysis.priority.from} → ${analysis.priority.to}`
    : "Aucune transition prioritaire détectée";
  const fields = analysis.duplicateFields.length
    ? analysis.duplicateFields
        .map(({ field, copies }) => `- **${field}** : ${copies} ressaisie(s) par parcours`)
        .join("\n")
    : "- Aucun champ ressaisi";

  return `# Diagnostic ReSaisie Zéro

## ${workflow.name || "Parcours analysé"}

- **Ressaisies par parcours :** ${analysis.duplicateCopiesPerRun}
- **Temps annuel récupérable :** ${numberFr.format(analysis.hoursSavedPerYear)} h
- **Économie annuelle estimée :** ${numberFr.format(analysis.costSavedPerYear)} €
- **Automatisation prioritaire :** ${priority}

## Champs concernés

${fields}

## Première action

${
  analysis.priority
    ? `Connecter **${analysis.priority.from}** à **${analysis.priority.to}** pour transmettre automatiquement : ${analysis.priority.duplicatedFields.join(", ")}.`
    : "Le parcours ne contient pas encore de ressaisie détectable. Vérifiez les champs de chaque étape."
}

_Diagnostic généré localement par ReSaisie Zéro 1.0.0._
`;
}
