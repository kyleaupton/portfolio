import { queryCollection } from '@nuxt/content/server'

// https://llmstxt.org
export default defineEventHandler(async (event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl

  const [profile, entries, posts] = await Promise.all([
    queryCollection(event, 'profile').first(),
    queryProjects(event).where('tier', '=', 'project').all(),
    queryCollection(event, 'writing')
      .select('path', 'title', 'description', 'date')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .all(),
  ])
  if (!profile) {
    throw createError({ statusCode: 500, statusMessage: 'Profile data missing' })
  }

  const projects = await Promise.all(
    entries.map(async entry => toSummary(entry, await getRepoStats(entry.repo))),
  )
  projects.sort(compareProjects)

  const link = (title: string, url: string, description?: string) =>
    `- [${title}](${url})${description ? `: ${description}` : ''}`

  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.title}. ${profile.focus}.`,
    '',
    '## Contact',
    '',
    link('Resume (PDF)', `${siteUrl}/resume`),
    link('GitHub', profile.github),
    link('LinkedIn', profile.linkedin),
    `- Email: ${profile.email}`,
    '',
    '## Career',
    '',
    ...profile.career.map(role => `- ${role.title}, ${role.company} (${role.start} – ${role.end ?? 'Present'})`),
    '',
    '## Tech',
    '',
    ...profile.tech.map(group => `- ${group.label}: ${group.items.join(', ')}`),
    '',
    '## Projects',
    '',
    ...projects.map(project => link(project.name, `${siteUrl}${project.to}`, project.description)),
  ]

  if (posts.length) {
    lines.push('', '## Writing', '', ...posts.map(post => link(post.title, `${siteUrl}${post.path}`, post.description)))
  }

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `${lines.join('\n')}\n`
})
