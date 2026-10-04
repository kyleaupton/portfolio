export default defineEventHandler(async (event): Promise<ProjectSummary[]> => {
  const entries = await queryProjects(event).all()
  const projects = await Promise.all(
    entries.map(async entry => toSummary(entry, await getRepoStats(entry.repo))),
  )
  return projects.sort(compareProjects)
})
