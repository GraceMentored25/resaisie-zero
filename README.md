# ReSaisie Zéro

ReSaisie Zéro aide les indépendants et petites entreprises à repérer les informations recopiées entre leurs outils, puis à chiffrer le temps et le coût annuels de ces ressaisies.

## Fonctionnalités

- trois modèles de parcours métier ;
- éditeur d’étapes et de champs ;
- calcul des doublons, du temps et du coût récupérables ;
- recommandation d’une première connexion à automatiser ;
- sauvegarde exclusivement locale ;
- export Markdown du diagnostic.

## Utilisation locale

```powershell
npx.cmd serve .
```

Ouvrez ensuite l’adresse indiquée par le serveur.

## Vérification

```powershell
npm.cmd test
npm.cmd run check
```

## Composants 21st.dev

- [Spotlight Card de Berkcan Gümüşışık](https://21st.dev/community/components/berkcangumusisik/spotlight-card/default), adapté en JavaScript et CSS natifs pour mettre en valeur la recommandation sans ajouter de dépendance.
- [Interactive Hover Button de Shatlyk1011](https://21st.dev/community/components/Shatlyk1011/interactive-hover-button), adapté pour l’export avec états de préparation et de réussite.

Ces adaptations conservent les interactions essentielles des composants sources tout en respectant les performances, l’accessibilité et les design tokens propres à ReSaisie Zéro.

## Confidentialité

L’application ne possède ni compte utilisateur, ni API, ni serveur applicatif. Le parcours saisi est conservé dans le `localStorage` du navigateur et peut être effacé depuis l’interface.

## Version

Version actuelle : **1.2.0**
