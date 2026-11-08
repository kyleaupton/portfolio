export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig(event).resumeUrl || process.env.RESUME_URL

  if (!url) {
    throw createError({ statusCode: 500, statusMessage: 'Resume URL is not configured' })
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) }).catch(() => null)

  if (!response?.ok || !response.body) {
    throw createError({ statusCode: 502, statusMessage: 'Failed to fetch resume' })
  }

  setResponseHeaders(event, {
    'Content-Type': response.headers.get('Content-Type') || 'application/pdf',
    'Content-Disposition': 'inline; filename="Kyle-Uptons-Resume.pdf"',
    'Cache-Control': 'public, max-age=600',
  })

  return response.body
})
