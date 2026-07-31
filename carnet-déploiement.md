# Carnet de déploiement

| N° | MVP | Version | GitHub | Application Cloudflare |
|---:|---|---:|---|---|
| 1 | ReSaisie Zéro — audit anti-copier-coller pour TPE | 1.1.0 | [GitHub](https://github.com/GraceMentored25/resaisie-zero) | [Worker Cloudflare](https://resaisie-zero.ricar-mvps.workers.dev/) — certificat TLS en propagation |

## Historique

- **2026-07-31 — 1.0.0 :** création du diagnostic local des ressaisies, estimation du coût annuel, recommandation prioritaire et export Markdown.
- **2026-07-31 — 1.1.0 :** ajout d’un conseil de cadrage pour démarrer par une automatisation déterministe lorsque le parcours est répétable, et nouvelle direction visuelle générée.
- **2026-07-31 — Cloudflare :** sous-domaine gratuit `ricar-mvps.workers.dev` créé et Worker `resaisie-zero` rattaché. La vérification HTTP est en attente de propagation TLS.
