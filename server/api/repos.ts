/**
 * API endpoint for getting repository data.
 */

export default defineEventHandler(() => {
  console.log("api/repos.ts: getRepoData() called");
  return getRepoData();
});
