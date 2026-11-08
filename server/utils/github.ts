import { Octokit, RequestError } from 'octokit'
import { createShikiHighlighter, parseMarkdown } from '@nuxtjs/mdc/runtime'
import { queryCollection } from '@nuxt/content/server'
import { bundledLanguages, bundledThemes } from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { MDCElement, MDCNode, MDCParserResult } from '@nuxtjs/mdc'
import type { H3Event } from 'h3'

export const GITHUB_OWNER = 'kyleaupton'

// Content highlights at build time, so MDC's /api/_mdc/highlight route isn't registered.
// Languages load lazily; READMEs use far more of them than the posts do.
const highlighter = createShikiHighlighter({
  bundledLangs: bundledLanguages,
  bundledThemes,
  engine: createJavaScriptRegexEngine({ forgiving: true }),
})

const CACHE = { maxAge: 60 * 10, swr: true, group: 'github' } as const

export interface RepoStats {
  description: string | null
  language: string | null
  stars: number
  pushedAt: string | null
  url: string
  homepage: string | null
  defaultBranch: string
  archived: boolean
  license: string | null
}

export interface ProjectSummary {
  slug: string
  repo: string
  name: string
  tier: 'project' | 'archive'
  featured: boolean
  tech: string[]
  npm?: string
  to: string
  description: string
  url: string
  homepage: string | null
  stars: number | null
  language: string | null
  pushedAt: string | null
  /** False when GitHub data is unavailable (no token, repo missing, API error). */
  hasStats: boolean
}

export interface ProjectDetail extends ProjectSummary {
  defaultBranch: string | null
  license: string | null
  commits: number | null
  readme: Pick<MDCParserResult, 'body' | 'data' | 'toc'> | null
}

let client: { token: string, octokit: Octokit } | undefined
let warnedMissingToken = false

function useOctokit(): Octokit | undefined {
  const token = useRuntimeConfig().githubToken || process.env.GITHUB_TOKEN
  if (!token) {
    if (!warnedMissingToken) {
      console.warn('[github] No token (NUXT_GITHUB_TOKEN or GITHUB_TOKEN); serving projects without GitHub data')
      warnedMissingToken = true
    }
    return
  }
  if (client?.token !== token) client = { token, octokit: new Octokit({ auth: token }) }
  return client.octokit
}

function requireOctokit() {
  const octokit = useOctokit()
  if (!octokit) throw new Error('GitHub token missing')
  return octokit
}

function isNotFound(error: unknown) {
  return error instanceof RequestError && error.status === 404
}

// A 404 resolves to null so it gets cached; other errors throw and are not cached.
const cachedRepo = defineCachedFunction(async (repo: string): Promise<RepoStats | null> => {
  try {
    const { data } = await requireOctokit().rest.repos.get({ owner: GITHUB_OWNER, repo })
    return {
      description: data.description,
      language: data.language,
      stars: data.stargazers_count,
      pushedAt: data.pushed_at,
      url: data.html_url,
      homepage: data.homepage || null,
      defaultBranch: data.default_branch,
      archived: data.archived,
      license: data.license?.spdx_id && data.license.spdx_id !== 'NOASSERTION' ? data.license.spdx_id : null,
    }
  }
  catch (error) {
    if (isNotFound(error)) return null
    throw error
  }
}, { ...CACHE, name: 'repo', getKey: (repo: string) => repo })

const cachedCommitCount = defineCachedFunction(async (repo: string): Promise<number | null> => {
  // With per_page=1 the "last" page number in the Link header is the commit count
  const { headers, data } = await requireOctokit().rest.repos.listCommits({ owner: GITHUB_OWNER, repo, per_page: 1 })
  const last = headers.link?.match(/[?&]page=(\d+)>; rel="last"/)?.[1]
  return last ? Number.parseInt(last) : data.length
}, { ...CACHE, name: 'commits', getKey: (repo: string) => repo })

const cachedReadme = defineCachedFunction(async (repo: string, branch: string): Promise<ProjectDetail['readme']> => {
  let markdown: string
  try {
    const { data } = await requireOctokit().rest.repos.getReadme({ owner: GITHUB_OWNER, repo, ref: branch })
    markdown = Buffer.from(data.content, 'base64').toString('utf-8')
  }
  catch (error) {
    if (isNotFound(error)) return null
    throw error
  }

  const { body, data, toc } = await parseMarkdown(markdown, {
    highlight: { highlighter },
    toc: { depth: 3, searchDepth: 3 },
  })
  body.children = transformReadme(body.children, repo, branch)
  return { body, data, toc }
}, { ...CACHE, name: 'readme', getKey: (repo: string, branch: string) => `${repo}@${branch}` })

async function safely<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  if (!useOctokit()) return null
  try {
    return await fn()
  }
  catch (error) {
    console.error(`[github] ${label} failed:`, error instanceof Error ? error.message : error)
    return null
  }
}

export const getRepoStats = (repo: string) => safely(`repo ${repo}`, () => cachedRepo(repo))
export const getCommitCount = (repo: string) => safely(`commits ${repo}`, () => cachedCommitCount(repo))
export const getReadme = (repo: string, branch: string) => safely(`readme ${repo}`, () => cachedReadme(repo, branch))

type ProjectEntry = Awaited<ReturnType<ReturnType<typeof queryProjects>['all']>>[number]

export function queryProjects(event: H3Event) {
  return queryCollection(event, 'projects')
}

export function projectSlug(entry: Pick<ProjectEntry, 'stem'>) {
  return entry.stem.replace(/^projects\//, '')
}

export function toSummary(entry: ProjectEntry, stats: RepoStats | null): ProjectSummary {
  const slug = projectSlug(entry)
  return {
    slug,
    repo: entry.repo,
    name: entry.name,
    tier: entry.tier,
    featured: entry.featured,
    tech: entry.tech,
    npm: entry.npm ?? undefined,
    to: `/projects/${slug}`,
    description: entry.pitch || stats?.description || '',
    url: stats?.url ?? `https://github.com/${GITHUB_OWNER}/${entry.repo}`,
    homepage: stats?.homepage ?? null,
    stars: stats?.stars ?? null,
    language: stats?.language ?? null,
    pushedAt: stats?.pushedAt ?? null,
    hasStats: !!stats,
  }
}

export function compareProjects(a: ProjectSummary, b: ProjectSummary) {
  return Number(a.tier === 'archive') - Number(b.tier === 'archive')
    || (b.pushedAt ?? '').localeCompare(a.pushedAt ?? '')
    || a.name.localeCompare(b.name)
}

const ALERTS: Record<string, string> = {
  NOTE: 'prose-note',
  IMPORTANT: 'prose-note',
  TIP: 'prose-tip',
  WARNING: 'prose-warning',
  CAUTION: 'prose-caution',
}

function isElement(node: MDCNode | undefined): node is MDCElement {
  return node?.type === 'element'
}

function resolveUrl(url: unknown, base: string) {
  if (typeof url !== 'string' || !url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return url
  return new URL(url.replace(/^\//, ''), base).href
}

const BADGE_URL = /img\.shields\.io|\/badge\.svg/

// READMEs styled as a centered logo/title/tagline block repeat what the page header shows.
function stripCenteredBanner(children: MDCNode[]) {
  const elements = children.filter(isElement)
  const end = elements.findIndex(node => node.props?.align !== 'center')
  const banner = elements.slice(0, end)
  if (!banner.some(node => node.tag === 'h1')) return children

  const dropped = new Set<MDCNode>(banner)
  if (elements[end]?.tag === 'hr') dropped.add(elements[end])
  return children.filter(node => !dropped.has(node))
}

function transformReadme(children: MDCNode[], repo: string, branch: string) {
  const rawBase = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${repo}/${branch}/`
  const blobBase = `https://github.com/${GITHUB_OWNER}/${repo}/blob/${branch}/`

  children = stripCenteredBanner(children)

  // The page header already shows the project name
  const first = children.find(isElement)
  if (first?.tag === 'h1' && !JSON.stringify(first.children).includes('"tag":"img"')) {
    children = children.filter(node => node !== first)
  }

  const visit = (node: MDCNode): MDCNode => {
    if (!isElement(node)) return node
    const props = node.props ?? {}

    // ProseImg requires alt, and some READMEs use raw <img> tags without one
    if (node.tag === 'img') props.alt ??= ''
    if (node.tag === 'img' || node.tag === 'source' || node.tag === 'video') {
      props.src = resolveUrl(props.src, rawBase)
      if (typeof props.srcset === 'string' && !props.srcset.includes(',')) {
        props.srcset = resolveUrl(props.srcset.trim(), rawBase)
      }
    }
    // ProseImg stretches any image without a width to the full column
    if (node.tag === 'img' && typeof props.src === 'string' && BADGE_URL.test(props.src)) {
      props.width = 'auto'
      props.class = 'inline h-5'
      props[':zoom'] = 'false'
    }
    if (node.tag === 'a') props.href = resolveUrl(props.href, blobBase)

    if (node.tag === 'blockquote') {
      const alert = toAlert(node)
      if (alert) return { ...alert, children: alert.children.map(visit) }
    }

    return { ...node, props, children: node.children.map(visit) }
  }

  return children.map(visit)
}

// GitHub alert syntax: a blockquote whose first line is `[!NOTE]`, `[!TIP]`, ...
// remark-mdc parses `[!NOTE]` as an inline span, so the marker arrives as <span>!NOTE</span>.
function toAlert(node: MDCElement): MDCElement | undefined {
  const paragraph = node.children.find(isElement)
  const marker = paragraph?.tag === 'p' ? paragraph.children[0] : undefined
  const markerText = isElement(marker) && marker.tag === 'span' && marker.children.length === 1 ? marker.children[0] : undefined
  const type = markerText?.type === 'text' ? markerText.value.match(/^!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)$/)?.[1] : undefined
  if (!paragraph || !type) return

  const [next, ...rest] = paragraph.children.slice(1)
  const paragraphChildren = next?.type === 'text'
    ? [{ ...next, value: next.value.replace(/^\s+/, '') }, ...rest]
    : paragraph.children.slice(1)
  const children = node.children.flatMap((child) => {
    if (child !== paragraph) return [child]
    return paragraphChildren.some(c => c.type !== 'text' || c.value.trim())
      ? [{ ...paragraph, children: paragraphChildren }]
      : []
  })
  return { type: 'element', tag: ALERTS[type]!, props: {}, children }
}
