import test from "node:test";
import assert from "node:assert/strict";
import { analyzeWorkflow, buildMarkdownReport } from "../src/audit.js";

const workflow = {
  name: "Accueil d’un nouveau client",
  runsPerMonth: 20,
  hourlyCost: 35,
  minutesPerCopy: 2,
  steps: [
    { name: "Formulaire", tool: "Tally", fields: ["nom", "email", "adresse"] },
    { name: "Agenda", tool: "Calendly", fields: ["nom", "email"] },
    { name: "Facture", tool: "Henrri", fields: ["nom", "email", "adresse"] },
  ],
};

test("compte chaque nouvelle saisie d’un champ après sa première apparition", () => {
  const result = analyzeWorkflow(workflow);
  assert.equal(result.duplicateCopiesPerRun, 5);
  assert.deepEqual(result.duplicateFields, [
    { field: "email", copies: 2 },
    { field: "nom", copies: 2 },
    { field: "adresse", copies: 1 },
  ]);
});

test("calcule le temps et le coût annuels évitables", () => {
  const result = analyzeWorkflow(workflow);
  assert.equal(result.minutesSavedPerYear, 2400);
  assert.equal(result.hoursSavedPerYear, 40);
  assert.equal(result.costSavedPerYear, 1400);
});

test("recommande la transition qui transporte le plus de champs déjà connus", () => {
  const result = analyzeWorkflow(workflow);
  assert.deepEqual(result.priority, {
    stepIndex: 2,
    from: "Agenda",
    to: "Facture",
    duplicatedFields: ["nom", "email", "adresse"],
    score: 3,
  });
});

test("normalise les champs et ignore les doublons internes à une étape", () => {
  const result = analyzeWorkflow({
    ...workflow,
    steps: [
      { name: "A", tool: "Formulaire", fields: [" Email ", "email", "NOM"] },
      { name: "B", tool: "CRM", fields: ["EMAIL", "nom"] },
    ],
  });
  assert.equal(result.duplicateCopiesPerRun, 2);
});

test("rejette les fréquences, coûts et durées invalides", () => {
  assert.throws(
    () => analyzeWorkflow({ ...workflow, runsPerMonth: -1 }),
    /fréquence/i,
  );
  assert.throws(
    () => analyzeWorkflow({ ...workflow, hourlyCost: Number.NaN }),
    /coût/i,
  );
  assert.throws(
    () => analyzeWorkflow({ ...workflow, minutesPerCopy: 0 }),
    /durée/i,
  );
});

test("produit un rapport Markdown exploitable", () => {
  const analysis = analyzeWorkflow(workflow);
  const report = buildMarkdownReport(workflow, analysis);
  assert.match(report, /^# Diagnostic ReSaisie Zéro/m);
  assert.match(report, /40 h/);
  assert.match(report, /1 400 €/);
  assert.match(report, /Agenda → Facture/);
});
