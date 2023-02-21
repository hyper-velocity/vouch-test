<template>
  <div>
    <user-list-item
      v-for="user in users"
      :key="user.user.id"
      class="mb-4"
      :user="user"
    />
  </div>
</template>

<script setup lang="ts">
import { User } from 'src/types/user'

defineProps<{
  users: User[]
}>()
</script>
