import { queryCollection } from '@nuxt/content/server'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl

  const query = queryCollection(event, 'writing')
    .select('path', 'title', 'description', 'date')
    .order('date', 'DESC')
  const posts = await (import.meta.dev ? query.all() : query.where('draft', '=', false).all())

  const items = posts.map((post) => {
    const url = `${siteUrl}${post.path}`
    return [
      '<item>',
      `<title>${escapeXml(post.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
      post.description ? `<description>${escapeXml(post.description)}</description>` : '',
      '</item>',
    ].join('')
  })

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    '<title>Kyle Upton</title>',
    `<link>${siteUrl}/writing</link>`,
    '<description>Writing by Kyle Upton</description>',
    '<language>en-us</language>',
    `<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>`,
    posts[0] ? `<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` : '',
    ...items,
    '</channel>',
    '</rss>',
  ].join('\n')

  setResponseHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return xml
})
