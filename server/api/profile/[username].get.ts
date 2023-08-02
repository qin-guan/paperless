export default defineEventHandler(async (event) => {
  const username = event.context.params?.username
  if (!username) {
    return createError("No username")
  }

  try {
    const data = await event.context.profileStorage.getItem(username)
    if (!data) {
      return createError({ statusCode: 404, statusMessage: 'Not found' })
    }

    setHeader(event, 'Content-Disposition', `attachment; filename="${username}.vcf"`)
    setHeader(event, 'Content-Type', 'text/vcf')

    return data
  } catch (err) {
    return JSON.stringify(err)
  }
})
