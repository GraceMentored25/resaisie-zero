import { analyzeWorkflow, buildMarkdownReport } from "./audit.js";

const STORAGE_KEY = "resaisie-zero-workflow-v1";
const numberFr = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 1,
});

const templates = {
  onboarding: {
    name: "Accueil d’un nouveau client",
    runsPerMonth: 20,
    hourlyCost: 35,
    minutesPerCopy: 2,
    steps: [
      { name: "Demande initiale", tool: "Formulaire web", fields: ["nom", "e-mail", "téléphone", "besoin"] },
      { name: "Rendez-vous", tool: "Agenda", fields: ["nom", "e-mail", "téléphone"] },
      { name: "Fiche client", tool: "CRM", fields: ["nom", "e-mail", "téléphone", "besoin"] },
      { name: "Facturation", tool: "Logiciel de facturation", fields: ["nom", "e-mail", "adresse"] },
    ],
  },
  appointment: {
    name: "Prise de rendez-vous",
    runsPerMonth: 45,
    hourlyCost: 32,
    minutesPerCopy: 1.5,
    steps: [
      { name: "Demande", tool: "Messagerie", fields: ["nom", "e-mail", "motif"] },
      { name: "Réservation", tool: "Agenda", fields: ["nom", "e-mail", "motif"] },
      { name: "Dossier client", tool: "Tableur", fields: ["nom", "e-mail", "motif", "statut"] },
    ],
  },
  order: {
    name: "Traitement d’une commande",
    runsPerMonth: 60,
    hourlyCost: 38,
    minutesPerCopy: 2,
    steps: [
      { name: "Commande reçue", tool: "Boutique en ligne", fields: ["nom", "e-mail", "adresse", "produit"] },
      { name: "Préparation", tool: "Tableur", fields: ["nom", "adresse", "produit"] },
      { name: "Expédition", tool: "Portail transporteur", fields: ["nom", "e-mail", "adresse"] },
      { name: "Facture", tool: "Logiciel comptable", fields: ["nom", "e-mail", "adresse", "produit"] },
    ],
  },
  blank: {
    name: "Mon parcours",
    runsPerMonth: 10,
    hourlyCost: 35,
    minutesPerCopy: 2,
    steps: [
      { name: "Première étape", tool: "", fields: [] },
      { name: "Deuxième étape", tool: "", fields: [] },
    ],
  },
};

const elements = {
  form: document.querySelector("#workflow-form"),
  name: document.querySelector("#workflow-name"),
  runs: document.querySelector("#runs-per-month"),
  cost: document.querySelector("#hourly-cost"),
  minutes: document.querySelector("#minutes-per-copy"),
  template: document.querySelector("#template-select"),
  steps: document.querySelector("#steps-list"),
  stepTemplate: document.querySelector("#step-template"),
  duplicateCount: document.querySelector("#duplicate-count"),
  hoursSaved: document.querySelector("#hours-saved"),
  costSaved: document.querySelector("#cost-saved"),
  priorityTitle: document.querySelector("#priority-title"),
  priorityCopy: document.querySelector("#priority-copy"),
  automationFit: document.querySelector("#automation-fit"),
  resultLabel: document.querySelector("#result-label"),
  toast: document.querySelector("#toast"),
};

let state = loadState() || structuredClone(templates.onboarding);
let analysis = null;
let toastTimer;

function loadState() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => elements.toast.classList.remove("is-visible"), 2400);
}

function syncSettings() {
  elements.name.value = state.name;
  elements.runs.value = state.runsPerMonth;
  elements.cost.value = state.hourlyCost;
  elements.minutes.value = state.minutesPerCopy;
}

function renderSteps() {
  elements.steps.replaceChildren();
  state.steps.forEach((step, index) => {
    const fragment = elements.stepTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".step-card");
    const indexElement = fragment.querySelector(".step-index");
    indexElement.textContent = String(index + 1).padStart(2, "0");

    for (const input of fragment.querySelectorAll("input")) {
      const key = input.dataset.field;
      input.value = key === "fields" ? step.fields.join(", ") : step[key];
      input.addEventListener("input", () => {
        state.steps[index][key] =
          key === "fields"
            ? input.value.split(",").map((value) => value.trim()).filter(Boolean)
            : input.value;
        update();
      });
    }

    const removeButton = fragment.querySelector(".remove-step");
    removeButton.addEventListener("click", () => {
      if (state.steps.length <= 1) {
        showToast("Gardez au moins une étape dans le parcours.");
        return;
      }
      state.steps.splice(index, 1);
      renderSteps();
      update();
    });
    card.setAttribute("aria-label", `Étape ${index + 1}`);
    elements.steps.append(fragment);
  });
}

function renderAnalysis() {
  try {
    analysis = analyzeWorkflow(state);
    elements.duplicateCount.textContent = numberFr.format(
      analysis.duplicateCopiesPerRun,
    );
    elements.hoursSaved.textContent = numberFr.format(
      analysis.hoursSavedPerYear,
    );
    elements.costSaved.textContent = `${numberFr.format(
      analysis.costSavedPerYear,
    )} €`;
    elements.resultLabel.textContent = "Diagnostic en direct";

    if (analysis.priority) {
      elements.priorityTitle.textContent = `${analysis.priority.from} → ${analysis.priority.to}`;
      elements.priorityCopy.textContent = `Transmettez automatiquement ${analysis.priority.duplicatedFields.join(
        ", ",
      )}. C’est la transition qui concentre le plus de ressaisies.`;
    } else {
      elements.priorityTitle.textContent = "Aucune ressaisie détectée";
      elements.priorityCopy.textContent =
        "Ajoutez les informations saisies à chaque étape pour faire apparaître les doublons.";
    }
    elements.automationFit.innerHTML = `<strong>${analysis.automationFit.label}</strong><span>${analysis.automationFit.copy}</span>`;
  } catch (error) {
    analysis = null;
    elements.duplicateCount.textContent = "—";
    elements.hoursSaved.textContent = "—";
    elements.costSaved.textContent = "—";
    elements.priorityTitle.textContent = "Diagnostic incomplet";
    elements.priorityCopy.textContent = error.message;
    elements.resultLabel.textContent = "À compléter";
    elements.automationFit.textContent = "Le conseil de mise en œuvre apparaîtra ici.";
  }
}

function update() {
  saveState();
  renderAnalysis();
}

function applyTemplate(templateName) {
  state = structuredClone(templates[templateName] || templates.onboarding);
  syncSettings();
  renderSteps();
  update();
  showToast("Modèle chargé.");
}

elements.form.addEventListener("input", (event) => {
  if (event.target.closest(".step-card")) return;
  state.name = elements.name.value;
  state.runsPerMonth = Number(elements.runs.value);
  state.hourlyCost = Number(elements.cost.value);
  state.minutesPerCopy = Number(elements.minutes.value);
  update();
});

elements.template.addEventListener("change", () => {
  applyTemplate(elements.template.value);
});

document.querySelector("#add-step").addEventListener("click", () => {
  state.steps.push({
    name: `Étape ${state.steps.length + 1}`,
    tool: "",
    fields: [],
  });
  renderSteps();
  update();
  elements.steps.lastElementChild?.querySelector("input")?.focus();
});

document.querySelector("#reset-workflow").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  applyTemplate("blank");
  showToast("Vos données locales ont été effacées.");
});

document.querySelector("#export-report").addEventListener("click", () => {
  if (!analysis) {
    showToast("Complétez le diagnostic avant de l’exporter.");
    return;
  }
  const content = buildMarkdownReport(state, analysis);
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = (state.name || "diagnostic")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  link.href = url;
  link.download = `diagnostic-${slug || "resaisie-zero"}.md`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Diagnostic exporté.");
});

syncSettings();
renderSteps();
renderAnalysis();
