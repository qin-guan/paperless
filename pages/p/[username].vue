<script setup lang="ts">
import { Profile } from '~/shared/types'

const route = useRoute()

const { data, error } = await useFetch<Profile>('/api/profile/' + route.params.username)
</script>

<template>
  <div>
    <div v-if="error">
      <span class="text-red-500">
        An error occured!
      </span>
      <details>
        {{ error }}
      </details>
    </div>
    <div v-else-if="data">
      <h1 class="text-xl font-semibold">
        {{ data.namePrefix }} {{ data.firstName }} {{ data.lastName }}
      </h1>
    </div>
  </div>
</template>
