export default defineEventHandler(async (event) => {
  const username = event.context.params?.username
  if (!username) {
    return createError("No username")
  }

  return event.context.profileStorage.getItem(username)
})
