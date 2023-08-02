import VCard from 'vcard-creator'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    username: string
    namePrefix: string
    firstName: string
    lastName: string
    companyName: string
    companyAddress: string
    jobTitle: string
    email: string
    phoneNumber: string
  }>(event)

  const card = new VCard()
  
  card
  .addName(body.lastName, body.firstName, body.namePrefix)
  .addCompany(body.companyName)
  .addAddress(body.companyAddress)
  .addJobtitle(body.jobTitle)
  .addEmail(body.email)
  .addPhoneNumber(body.phoneNumber)

  event.context.profileStorage.setItem(body.username, card.toString())

  return {
    ok: true
  }
})
