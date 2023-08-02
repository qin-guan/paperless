<script setup lang="ts">
const state = reactive<{
  pending: boolean,
  error?: string,
}>({
  pending: false,
})

async function create(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)

  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
    namePrefix: formData.get('namePrefix'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    companyName: formData.get('companyName'),
    companyAddress: formData.get('companyAddress'),
    jobTitle: formData.get('jobTitle'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
  }

  try {
    await $fetch<{
      profileLink: string
      downloadLink: string
    }>('/api/profile', {
      method: 'POST',
      body: data
    })

    await navigateTo(`https://paperless-nextjs.pages.dev/p/${data.username}`, { external: true })

  } catch (err) {
    state.error = JSON.stringify(err)
  } finally {
    state.pending = false
  }
}
</script>

<template>
  <UContainer>
    <h1 class="font-semibold my-4">Paperless</h1>

    <form @submit.prevent="create($event)" class="space-y-4">
      <UInput name="username" placeholder="Username" />
      <UInput name="password" placeholder="Password (optional)" />

      <UInput name="namePrefix" placeholder="Name prefix" />
      <UInput name="firstName" placeholder="First name" />
      <UInput name="lastName" placeholder="Last name" />

      <UInput name="companyName" placeholder="Company name" />
      <UInput name="companyAddress" placeholder="Company address" />
      <UInput name="jobTitle" placeholder="Job title" />

      <UInput name="email" placeholder="Email" />
      <UInput name="phoneNumber" placeholder="Phone number" />

      <UButton type="submit" :loading="state.pending">Submit</UButton>

      <span class="text-red-500" v-if="state.error">
        {{ state.error }}
      </span>
    </form>
  </UContainer>
</template>
