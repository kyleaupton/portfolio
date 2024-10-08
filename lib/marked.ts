import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import markedAlert from 'marked-alert'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const marked = new Marked(markedHighlight({
  langPrefix: 'hljs language-',
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
}), { gfm: true }).use(markedAlert())

export default marked
