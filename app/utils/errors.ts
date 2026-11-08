import type { NuxtError } from '#app'

// Only a failed request should show the error page. Leaving a page mid-fetch aborts
// the request and leaves data empty with no error, and that's not a failure.
export function throwIfFailed(error: NuxtError | undefined) {
  if (!error) return
  throw createError({
    statusCode: error.statusCode || 500,
    statusMessage: error.statusMessage,
    fatal: true,
  })
}
