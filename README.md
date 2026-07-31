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
- [Field de coss](https://21st.dev/community/components/coss.com/field), adapté aux champs, descriptions, focus et erreurs de validation.
- [NumberField de James Shopland](https://21st.dev/community/components/jolbol1/numberfield), adapté avec des contrôles d’incrémentation cohérents entre navigateurs.
- [Flexnative Select de David Hakobyan](https://21st.dev/community/components/larsen66/flexnative-select/with-avatar), adapté en sélecteur de modèle descriptif avec navigation clavier.

Ces adaptations conservent les interactions essentielles des composants sources tout en respectant les performances, l’accessibilité et les design tokens propres à ReSaisie Zéro.

## Référence d’interface

L’ensemble de l’application adapte le [système Visitors sur Refero](https://styles.refero.design/style/e7876363-181a-44a9-9e5c-2255cf98aea5) : navigation en pilule, toile blanche, bande produit bleu-lavande, surfaces plates, bordures fines, contrôles arrondis et panneaux analytiques lisibles. La palette reprend les tokens Visitors Carbon, Graphite, Ash, Fog, Mist, Linen, Paper White, Lavender, Iris, Sky, Mint et Mint Wash. Les composants, le contenu et les interactions restent propres à ReSaisie Zéro.

## Confidentialité

L’application ne possède ni compte utilisateur, ni API, ni serveur applicatif. Le parcours saisi est conservé dans le `localStorage` du navigateur et peut être effacé depuis l’interface.

## Version

Version actuelle : **2.0.2**
