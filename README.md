# GStack Tech Guides

Hands-on technical guides and tutorials for modern DevOps, built with MkDocs Material and published on GitHub Pages.

**Live site:** https://garstack1.github.io/gstack-tech-guides/

## What's inside

| Section | What you'll learn |
| --- | --- |
| 🐳 **Docker** | Containers from first principles: images, volumes, networking, Compose |
| ☸️ **Kubernetes** | Orchestrating containers at scale: architecture, workloads, services, operators |
| 🚀 **CI/CD & GitOps** | Automating build, test, and deploy pipelines, with Git as the single source of truth (Argo CD) |

Suggested path: Docker, then Kubernetes, then CI/CD & GitOps.

## How the content is organised

Each section follows the [Diátaxis](https://diataxis.fr/) framework:

- **Tutorials** - guided, hands-on lessons from beginner to advanced
- **How-to guides** - task-focused steps for specific problems
- **Reference** - commands and configuration for quick lookup
- **Explanation** - the concepts behind the tools

## Run it locally

```bash
git clone https://github.com/garstack1/gstack-tech-guides.git
cd gstack-tech-guides
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Then open http://127.0.0.1:8000

## Deploy

```bash
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch, which GitHub Pages serves.

## Branches

- `main` - Markdown source and MkDocs configuration
- `gh-pages` - generated site (do not edit by hand)

## Author

Garrett Stack - [garstack.com](https://garstack.com)
