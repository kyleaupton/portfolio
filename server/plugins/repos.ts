import { setRepoData } from '../utils/repos'

export default defineNitroPlugin(async () => {
  // Nuxt Content prerenders during `nuxt build`; the interval would keep the build process alive
  if (import.meta.prerender) return

  await setRepoData()

  setInterval(setRepoData, 1000 * 60 * 5)
})
