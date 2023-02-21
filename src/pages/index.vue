<template>
  <q-page class="p-3">
    <user-list :users="users" />
  </q-page>
</template>

<script setup lang="ts">
import { users } from 'src/const'
</script>

<route>
{
  "name": "Home"
}
</route>
