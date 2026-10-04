# CLAUDE.md

Kyle Upton's personal site (kyleupton.dev): project showcase, product pages (FlashIt), and writing.

**A rebuild is in progress on the `rebuild` branch.** `docs/rebuild/PLAN.md` is the source of truth for decisions, the site map, data design and phase ownership. Read it before doing rebuild work. The code may still be partway between the old Nuxt 3 / shadcn-vue site and the new stack.

## Stack (target)

Nuxt 4 (`app/` directory), Nuxt UI v4, Nuxt Content v3, Tailwind CSS v4, TypeScript. Package manager: **npm**.

## Commands

- `npm run dev`: dev server
- `npm run build`: production build (`.output/`)
- `npm run lint`: ESLint
- `npx nuxi typecheck`: type check

There's no test suite. "Verified" means build, lint and typecheck pass and the affected pages render.

## Conventions

- `<script setup lang="ts">`. 2 spaces, no semicolons, single quotes.
- Before writing UI, load the `nuxt-ui` skill, and check component APIs with the Nuxt UI MCP server (`mcp__nuxt-ui__*`). Don't guess props or slots.
- Use semantic color tokens only (`text-muted`, `bg-elevated`, `text-highlighted`, `primary`, ...), never raw palette classes. The visual identity will be swapped in later through `app/app.config.ts` and CSS variables.
- Icons come from Iconify (`i-lucide-*`, `i-simple-icons-*`).
- Load server data with `useFetch`/`useAsyncData` so it's in the server-rendered HTML. GitHub access goes through cached Nitro functions.

## Environment

- `NUXT_GITHUB_TOKEN` (or `GITHUB_TOKEN`): GitHub API
- `NUXT_RESUME_URL` (or `RESUME_URL`): resume PDF to proxy at `/resume`

## Deployment

Docker image, deployed by Coolify on every push to `main`. Never push to `main` without Kyle's explicit go-ahead.

## Git

No AI attribution in commits or PRs.
