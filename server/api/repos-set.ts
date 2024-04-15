/**
 * API endpoint to trigger data refresh.
 * Intended to be called by a scheduled event.
 */

export default defineEventHandler((event) => {
  if (
    event.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  return setRepoData();
});
