# Carnet de déploiement

| N° | MVP | Version | GitHub | Application Cloudflare |
|---:|---|---:|---|---|
| 1 | ReSaisie Zéro — audit anti-copier-coller pour TPE | 1.1.0 | [GitHub](https://github.com/GraceMentored25/resaisie-zero) | Worker publié ; URL publique bloquée (sous-domaine workers.dev/zone DNS absent) |

## Historique

- **2026-07-31 — 1.0.0 :** création du diagnostic local des ressaisies, estimation du coût annuel, recommandation prioritaire et export Markdown.
- **2026-07-31 — 1.1.0 :** ajout d’un conseil de cadrage pour démarrer par une automatisation déterministe lorsque le parcours est répétable, et nouvelle direction visuelle générée.
- **2026-07-31 — Cloudflare :** le Worker `resaisie-zero` a été publié. La vérification publique reste bloquée tant que le compte ne possède pas de sous-domaine `workers.dev` initialisé ou de zone DNS utilisable.
