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

## Confidentialité

L’application ne possède ni compte utilisateur, ni API, ni serveur applicatif. Le parcours saisi est conservé dans le `localStorage` du navigateur et peut être effacé depuis l’interface.

## Version

Version actuelle : **1.0.0**
