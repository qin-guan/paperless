export type Profile = {
  username: string
  password: string

  namePrefix: string
  firstName: string
  lastName: string

  companyName: string
  companyAddress: string

  jobTitle: string
  email: string
  phoneNumber: string
} & {  // For unstorage meta
  [key: string]: string
}
