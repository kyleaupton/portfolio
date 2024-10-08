export default defineEventHandler(async (event) => {
  try {
    if (!process.env.RESUME_URL) {
      throw new Error('RESUME_URL environment variable is required')
    }

    const response = await fetch(process.env.RESUME_URL)

    if (!response.ok || !response.body) {
      throw new Error('Failed to fetch PDF')
    }

    const contentType = response.headers.get('Content-Type') || 'application/pdf'

    // Set the headers for the response
    event.node.res.setHeader('Content-Type', contentType)
    event.node.res.setHeader(
      'Content-Disposition',
      `inline; filename="Kyle-Uptons-Resume.pdf"`,
    )

    // Stream the response body to the client
    const reader = response.body.getReader()
    const writer = event.node.res

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      writer.write(value)
    }
    writer.end()
  }
  catch (error) {
    console.error('Error fetching PDF from S3:', error)
    throw createError({ statusCode: 500, message: 'Failed to fetch PDF' })
  }
})
