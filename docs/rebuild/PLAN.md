# Portfolio rebuild plan

We're rebuilding kyleupton.dev from scratch on Nuxt 4, Nuxt UI v4, Nuxt Content v3 and Tailwind v4, replacing the Nuxt 3 + shadcn-vue site. The work happens on the `rebuild` branch. Pushing to `main` deploys to production through Coolify, so nothing merges until Kyle says so.

The old site is in git history (`main`). Use it for reference: content, the header links, the README image-URL rewriting in `lib/marked.ts`, and the GitHub fetching in `server/utils/repos.ts`.

## Decisions

- **Theme:** follows the system color mode, with a toggle. Stone neutrals with an orange accent used sparingly (current-job dot, hovered rows, active nav link). Use **semantic tokens only** (`text-muted`, `bg-elevated`, `border-default`, `primary`, ...). Don't write raw palette classes like `text-neutral-400` or `text-white`. Colors go in `app/app.config.ts` and fonts/radius in CSS variables, so the theme can be swapped in one place.
- **Package manager:** npm (`package-lock.json`). Yarn is removed.
- **Domain:** `https://kyleupton.dev`
- **Code style:** `<script setup lang="ts">` everywhere. 2 spaces, no semicolons, single quotes (ESLint stylistic via `@nuxt/eslint`).
- **Icons:** Iconify through Nuxt UI (`i-lucide-*`, `i-simple-icons-*`). No FontAwesome or hand-made SVG icon components.
- **Hero copy:** keep the current text, but fix the typo ("achitecting" → "architecting").
- **Markdown:** Nuxt Content / MDC with Shiki everywhere (posts and GitHub READMEs). No `marked`, `highlight.js` or `github-markdown-css`.

## Site map

| Route | Phase | Notes |
|---|---|---|
| `/` | P4 | Bare hero, career timeline beside a tech list, featured projects by last push, latest writing once posts exist. No site header. |
| `/projects` | P2a | All non-archived projects, then a compact archive list |
| `/projects/[slug]` | P2a | Project and archive tiers: README plus GitHub stats and links |
| `/writing`, `/writing/[slug]` | P2b | Hidden from the nav until a non-draft post exists |
| `/rss.xml` | P2b | |
| `/resume` | P2c | Existing PDF proxy (`RESUME_URL`) |
| `/llms.txt` | P4 | Plain-text summary for AI tools, built from `profile.yml` and project data |

**Header:** name, then Projects / Writing / Resume, then GitHub, LinkedIn, copy-email, color mode toggle.
Email: kyleaupton@gmail.com. LinkedIn: https://linkedin.com/in/kyle-upton-50bb1a188. GitHub: https://github.com/kyleaupton.

## Data design

### `projects` collection (`content/projects/<slug>.yml`, `type: 'data'`)

```yaml
repo: flashit            # GitHub repo under kyleaupton
name: FlashIt
tier: project            # project | archive
featured: true           # shown on the home page; lists sort by last push
tech: [go, vue, c, obj-c]
pitch: Optional one-liner that overrides the GitHub description
npm: https://...         # optional
```

Tiers:
- **project:** flashit, arrflix, bucket-browser, typed-electron-ipc, node-rsync, glob-copy, portfolio, resume, leet-scold, TransactionTracker
- **archive:** zerotier-utility, witte-quote-generator-desktop, win-iso, schedule-widget

Featured: flashit, arrflix, bucket-browser, typed-electron-ipc, node-rsync, glob-copy.

### `writing` collection (`content/writing/<slug>.md`, `type: 'page'`)

Frontmatter fields: `title`, `description`, `date`, `draft` (default false), optional `cover`. Drafts show in dev and are excluded in production. Reading time is computed. Vue components in `app/components/content/` can be used inside posts through MDC.

### GitHub data (server)

- Use `defineCachedFunction` / `defineCachedEventHandler` (stale-while-revalidate, about 10 min max age) in place of the old `setInterval` Nitro plugin. Fetch on demand per repo. Nothing runs at startup, and nothing throws when a module loads.
- The token comes from `runtimeConfig.githubToken` (`NUXT_GITHUB_TOKEN`; keep `GITHUB_TOKEN` working as a fallback). Missing token → a clear error when the request runs, not a crash at boot.
- Endpoints (the exact shape is up to the implementer):
  - `/api/projects`: content metadata merged with GitHub stats (description, stars, pushed_at, language).
  - `/api/projects/[slug]`: the above plus the README, parsed on the server into an MDC AST, with relative image/link URLs rewritten to `raw.githubusercontent.com/kyleaupton/<repo>/<default branch>/`.
- Pages load data with `useFetch`/`useAsyncData`, so it's in the server-rendered HTML.

## Phases

Each phase lists the files it owns. If you need to change a file owned by another phase, or a **shared** file (`nuxt.config.ts`, `package.json`, `content.config.ts`, `app/app.config.ts`, `app/layouts/*`), list the exact change in your report instead of making it. The coordinator applies it. P1 owns all shared files.

### P1: Foundation (sequential, everything depends on it)
- Switch to npm: delete `yarn.lock` and the `packageManager` field, and generate `package-lock.json`.
- Upgrade to Nuxt 4 with the `app/` directory structure. Add `@nuxt/ui`, `@nuxt/content`, Tailwind v4. Keep `nuxt-gtag` (`G-W1E8B7RHGN`) and `@nuxt/eslint`.
- Remove: shadcn-nuxt, radix-vue, vaul-vue, class-variance-authority, clsx, tailwind-merge, tailwindcss-animate, all FontAwesome packages, lucide-vue-next, floating-vue, fitty, moment, marked*, highlight.js, github-markdown-css, @unovis/*, autoprefixer/postcss config, `@nuxtjs/color-mode` (Nuxt UI includes it), `@nuxtjs/tailwindcss`, old `tailwind.config.js`, `components.json`, `lib/`, the old `components/`, `plugins/`.
- `content.config.ts` with both collections and their schemas as described above. Add one draft post so the collection builds.
- `nuxt.config.ts`: modules, runtimeConfig (`githubToken`, `resumeUrl`), site URL, `compatibilityDate`.
- `app/app.vue` (`UApp`), `app/layouts/default.vue` with `UHeader`/`UMain`/`UFooter`, `app/app.config.ts` (theme colors), `app/assets/css/main.css` (`@import "tailwindcss"; @import "@nuxt/ui";`).
- `app/pages/index.vue`: hero only (the copy above, semantic tokens, a tasteful entrance animation is fine). Leave `server/` alone except for anything the upgrade forces.
- Rewrite `CLAUDE.md` once the structure exists (commands, architecture, conventions).
- **Done when:** `npm run build`, `npm run lint` and `npx nuxi typecheck` pass, `/` renders in light and dark, and the work is committed.

### P2a: Project data and pages (parallel)
Owns: `content/projects/**`, `server/api/projects/**`, `server/utils/github.ts` (replaces `server/utils/repos.ts` and `server/plugins/repos.ts`), `app/pages/projects/**`, `app/components/project/**`.
Create the YAML files, the cached GitHub layer and the projects endpoints, `/projects` and `/projects/[slug]`. Also provide `ProjectCard` for P4 to reuse.

### P2b: Writing (parallel)
Owns: `content/writing/**`, `app/pages/writing/**`, `app/components/writing/**`, `app/components/content/**`, `server/routes/rss.xml.ts`.
A Medium-style reading page: one column about 68ch wide, large title, date and reading time, optional cover, prose via Nuxt UI, previous/next links. A simple post list. RSS. No tags or series yet. Kyle wants to discuss those first.

### P2c: Server and deploy cleanup (parallel)
Owns: `Dockerfile`, `.dockerignore`, `docker-compose.yml`, `server/routes/resume.ts`, `.devcontainer.json`.
Multi-stage Node 22 build: `npm ci`, non-root user, copy only `.output` into the final image, port 3001. Simplify the resume proxy (`sendStream`/`proxyRequest`, `runtimeConfig.resumeUrl`).

### P3: FlashIt (dropped)
FlashIt is getting its own domain, so it's a normal project here. Its project page links out through the repo's GitHub homepage field.

### P4: Home (after P2)
Owns: `app/pages/index.vue`, `app/components/home/**`. The ⌘K search was cut: with this few pages, the nav is enough.

### Before launch
A small-to-medium visual pass (font, accent color, spacing), a rewritten hero, social share images, and a first real post. The post is likely code-heavy, so check long code blocks on the reading page.

### P5: Review
Run `/code-review` on the branch diff, then a dev-server pass with screenshots of every route in light and dark mode.

## Open questions (don't decide these; flag them)
- Whether the old Unovis "technologies" section comes back in some form (currently dropped).
- Writing features beyond the basics (tags, series, notes, social images, newsletter).
- The visual identity (later pass).

## Report format (subagents)
Return at most about 12 lines: what was done, files touched (grouped), results of build/lint/typecheck, any shared-file changes needed, open questions or judgment calls. Don't paste code.
