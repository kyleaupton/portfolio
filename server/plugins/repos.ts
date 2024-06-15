import { setRepoData } from "../utils/repos";

export default defineNitroPlugin(async () => {
  // Initial setup
  await setRepoData();

  // Setup refresh interval
  setInterval(setRepoData, 1000 * 60 * 60); // 1 hour
});
