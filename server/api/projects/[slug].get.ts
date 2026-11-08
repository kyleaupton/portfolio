export default defineEventHandler(async (event): Promise<ProjectDetail> => {
  const slug = getRouterParam(event, 'slug')
  const entry = slug ? await queryProjects(event).where('stem', '=', `projects/${slug}`).first() : null
  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }

  const stats = await getRepoStats(entry.repo)
  const [commits, readme] = stats
    ? await Promise.all([getCommitCount(entry.repo), getReadme(entry.repo, stats.defaultBranch)])
    : [null, null]

  return {
    ...toSummary(entry, stats),
    defaultBranch: stats?.defaultBranch ?? null,
    license: stats?.license ?? null,
    commits,
    readme,
  }
})
