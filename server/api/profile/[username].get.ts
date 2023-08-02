export default defineEventHandler(async (event) => {
  const username = event.context.params?.username
  if (!username) {
    return createError("No username")
  }

  try {
    const data = await event.context.profileStorage.getItem(username)
    if (!data) {
      return "No data"
    }

    return data
  } catch (err) {
    return JSON.stringify(err)
  }
})
