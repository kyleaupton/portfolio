import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import markedAlert from 'marked-alert'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export function createMarked(repo: string, owner = 'kyleaupton', branch = 'main') {
  const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`

  function resolveUrl(url: string) {
    if (/^https?:\/\//.test(url)) return url
    return new URL(url, baseUrl).href
  }

  return new Marked(markedHighlight({
    langPrefix: 'hljs language-',
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }), { gfm: true }).use(markedAlert()).use({
    renderer: {
      image({ href, title, text }) {
        const titleAttr = title ? ` title="${title}"` : ''
        return `<img src="${resolveUrl(href)}" alt="${text}"${titleAttr} />`
      },
      html({ text }) {
        return text.replace(
          /(<img\s[^>]*\bsrc=["'])([^"']+)(["'])/gi,
          (_, before, src, after) => `${before}${resolveUrl(src)}${after}`,
        )
      },
    },
  })
}
