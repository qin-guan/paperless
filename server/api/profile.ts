export default defineEventHandler((event) => {
  event.context.profileStorage.setItem("test", 'test')
  return event.context.profileStorage.getItem("test")
})
