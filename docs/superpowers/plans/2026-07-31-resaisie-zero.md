# ReSaisie Zéro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer une application web statique qui chiffre et priorise les ressaisies administratives d’une TPE.

**Architecture:** La logique métier est isolée dans un module JavaScript pur et testable. Une couche DOM mince gère les formulaires, la persistance locale et l’export, tandis que Vercel sert les fichiers statiques.

**Tech Stack:** HTML5, CSS3, JavaScript ES modules, Node.js test runner, Vercel.

## Global Constraints

- Version initiale exacte : `1.0.0`.
- Aucune API payante, aucun compte utilisateur et aucun envoi de données.
- Interface française, responsive et accessible.
- Les données utilisateur restent dans le navigateur.

---

### Task 1: Moteur de diagnostic

**Files:**
- Create: `src/audit.js`
- Test: `tests/audit.test.js`

**Interfaces:**
- Produces: `analyzeWorkflow(workflow)` et `buildMarkdownReport(workflow, analysis)`.

- [ ] Écrire les tests d’abord pour le comptage des doublons, le coût annuel, les entrées invalides et la recommandation.
- [ ] Exécuter `node --test` et vérifier que les tests échouent parce que le module manque.
- [ ] Implémenter le minimum nécessaire dans `src/audit.js`.
- [ ] Réexécuter `node --test` et obtenir zéro échec.

### Task 2: Interface et persistance

**Files:**
- Create: `index.html`
- Create: `src/app.js`
- Create: `src/styles.css`

**Interfaces:**
- Consumes: `analyzeWorkflow` et `buildMarkdownReport`.

- [ ] Construire l’éditeur d’étapes, les paramètres de fréquence, le tableau de résultats et les actions.
- [ ] Ajouter trois modèles de flux et une sauvegarde `localStorage`.
- [ ] Ajouter l’export Markdown et l’effacement local.
- [ ] Vérifier le clavier, les libellés et les états vides.

### Task 3: Documentation et publication

**Files:**
- Create: `README.md`
- Create: `package.json`
- Create: `vercel.json`
- Create: `carnet-déploiement.md`

**Interfaces:**
- Produces: un dépôt versionné et un déploiement de production vérifié.

- [ ] Documenter usage, confidentialité, tests et déploiement.
- [ ] Exécuter les tests, la validation syntaxique et un serveur HTTP local.
- [ ] Créer le dépôt GitHub, pousser la version `1.0.0` et créer le tag `v1.0.0`.
- [ ] Déployer sur Vercel, vérifier l’URL puis compléter `carnet-déploiement.md`.
