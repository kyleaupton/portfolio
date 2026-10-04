# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Personal portfolio for https://kyleupton.dev, built on Nuxt 4, Nuxt UI v4, Nuxt Content v3 and Tailwind CSS v4. The rebuild plan and phase ownership live in `docs/rebuild/PLAN.md`.

## Commands

- `npm run dev`: development server
- `npm run build`: production build (outputs to `.output/`)
- `npm start`: run the production server
- `npm run lint`: ESLint (`npx eslint . --fix` to autofix)
- `npx nuxi typecheck`: type checking with vue-tsc

Package manager is **npm**. No test suite is configured.

## Architecture

- `app/`: Nuxt 4 source directory (`app.vue` wraps everything in `UApp`; `layouts/default.vue` holds `UHeader`/`UMain`/`UFooter`; `pages/` is file-based routing).
- `content/` plus `content.config.ts`: Nuxt Content collections. `projects` (`content/projects/*.yml`, data) and `writing` (`content/writing/*.md`, pages with `date`, `draft`, optional `cover`).
- `server/`: Nitro API routes and utils (GitHub data via Octokit, `/resume` PDF proxy).
- Runtime config: `githubToken` (`NUXT_GITHUB_TOKEN`), `resumeUrl` (`NUXT_RESUME_URL`), `public.siteUrl`. Defaults are empty on purpose; server code falls back to `process.env.GITHUB_TOKEN` / `RESUME_URL` at request time so secrets never end up in the build.
- Content uses the native `node:sqlite` connector, so Node >= 22.5 is required.

## Conventions

- `<script setup lang="ts">` everywhere.
- 2-space indentation, no semicolons, single quotes, enforced by `@nuxt/eslint` stylistic rules.
- Use Nuxt UI components before writing custom markup. Check APIs with the Nuxt UI MCP rather than from memory.
- Semantic color tokens only (`text-muted`, `text-highlighted`, `bg-elevated`, `border-default`, `primary`, ...); never raw palette classes like `text-neutral-400`.
- Theme colors live in `app/app.config.ts`; fonts and radius are CSS variables in `app/assets/css/main.css`.
- Icons are Iconify names through Nuxt UI (`i-lucide-*`, `i-simple-icons-*`), bundled locally from `@iconify-json/*`.
- Layouts must have a single root element.

## Deployment

Docker image deployed through Coolify CD on commits to `main`. Do not push to `main` without explicit approval.
