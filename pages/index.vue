<script setup lang="ts">

/*
  // Add personal data
  .addName(lastname, firstname, additional, prefix, suffix)
  // Add work data
  .addCompany('Siesqo')
  .addJobtitle('Web Developer')
  .addRole('Data Protection Officer')
  .addEmail('info@jeroendesloovere.be')
  .addPhoneNumber(1234121212, 'PREF;WORK')
  .addPhoneNumber(123456789, 'WORK')
  .addAddress(null, null, 'street', 'worktown', null, 'workpostcode', 'Belgium')
  .addSocial('https://twitter.com/desloovere_j', 'Twitter', 'desloovere_j')
  .addURL('http://www.jeroendesloovere.be')
*/

async function create(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)

  const data = {
    username: formData.get('username'),
    namePrefix: formData.get('namePrefix'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    companyName: formData.get('companyName'),
    companyAddress: formData.get('companyAddress'),
    jobTitle: formData.get('jobTitle'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  }

  await $fetch('/api/profile', {
    method: 'POST',
    body: data
  })
}
</script>

<template>
  <UContainer>
    <h1 class="font-semibold my-4">Paperless</h1>

    <form @submit.prevent="create($event)" class="space-y-4">
      <UInput name="username" placeholder="Username" />

      <UInput name="namePrefix" placeholder="Name prefix" />
      <UInput name="firstName" placeholder="First name" />
      <UInput name="lastName" placeholder="Last name" />

      <UInput name="companyName" placeholder="Company name" />
      <UInput name="companyAddress" placeholder="Company address" />
      <UInput name="jobTitle" placeholder="Job title" />

      <UInput name="email" placeholder="Email" />
      <UInput name="phoneNumber" placeholder="Phone number" />

      <UButton type="submit">Submit</UButton>
    </form>
  </UContainer>
</template>
