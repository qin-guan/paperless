import VCard from 'vcard-creator'
import { Profile } from '../../shared/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Profile>(event)

  const card = new VCard()
  
  card
  .addName(body.lastName, body.firstName, body.namePrefix)
  .addCompany(body.companyName)
  .addAddress(body.companyAddress)
  .addJobtitle(body.jobTitle)
  .addEmail(body.email)
  .addPhoneNumber(body.phoneNumber)

  if (await event.context.profileStorage.hasItem(body.username)) {
    const item = await event.context.profileStorage.getMeta(body.username) as Profile
    if (item.password !== body.password) {
      return createError({
        statusCode: 403,
        statusMessage: 'Unauthorized',
        message: 'Wrong password'
      })
    }
  }

  await event.context.profileStorage.setItem(body.username, card.toString())
  await event.context.profileStorage.setMeta(body.username, body)

  return { ok: true } 
})
