import { setRepoData } from "../utils/repos";

export default defineNitroPlugin(async () => {
  // Initial setup
  await setRepoData();

  // Setup refresh interval
  setInterval(setRepoData, 1000 * 60 * 5); // 5 minutes
});
