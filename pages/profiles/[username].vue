<script setup lang="ts">
const route = useRoute()

const data  = await useFetch('/api/profile/' + route.params.username)
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
