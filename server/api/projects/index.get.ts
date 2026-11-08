export default defineEventHandler(async (event): Promise<ProjectSummary[]> => {
  const query = queryProjects(event)
  const entries = await (getQuery(event).featured === 'true' ? query.where('featured', '=', true) : query).all()
  const projects = await Promise.all(
    entries.map(async entry => toSummary(entry, await getRepoStats(entry.repo))),
  )
  return projects.sort(compareProjects)
})
