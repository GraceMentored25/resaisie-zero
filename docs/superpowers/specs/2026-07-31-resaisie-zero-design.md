# ReSaisie Zéro — Design du MVP 1.0

## Opportunité

Un signal récent et répété chez les indépendants et petites entreprises montre que le même renseignement client est souvent copié entre formulaire, e-mail, agenda, facture et CRM. Le problème n’est pas l’absence d’un outil supplémentaire, mais l’absence d’une vue simple sur les ressaisies et leur coût.

## Proposition

ReSaisie Zéro est une application web locale qui permet de décrire les étapes d’un parcours administratif, d’indiquer les champs recopiés et la fréquence du processus, puis de calculer :

- le nombre de ressaisies évitables ;
- le temps et le coût annuels estimés ;
- l’étape d’automatisation prioritaire ;
- un plan d’action exportable en Markdown.

## Utilisateur cible

Indépendants, assistants virtuels, agences et TPE qui utilisent plusieurs outils sans équipe technique dédiée.

## Périmètre 1.0

- aucun compte et aucune API payante ;
- trois modèles de parcours préremplis ;
- ajout, modification et suppression d’étapes ;
- calcul local des doublons, du temps et du coût ;
- recommandation déterministe et explicable ;
- sauvegarde locale dans le navigateur ;
- export du diagnostic en Markdown ;
- interface responsive et accessible en français.

## Architecture

L’application est statique. `src/audit.js` contient la logique métier pure, `src/app.js` gère l’état et le DOM, et `src/styles.css` porte la présentation. Les tests Node couvrent les calculs et recommandations sans navigateur. Vercel sert les fichiers sans fonction serveur.

## Données et confidentialité

Les données restent dans `localStorage`. Aucun contenu saisi n’est envoyé à un serveur. Un bouton permet d’effacer l’audit.

## Critères de succès

Un utilisateur doit pouvoir partir d’un modèle, adapter son flux, obtenir un diagnostic compréhensible en moins de trois minutes et exporter un plan d’action. Le déploiement doit répondre en production et les calculs doivent être couverts par des tests automatisés.
