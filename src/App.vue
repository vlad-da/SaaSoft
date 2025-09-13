<script setup lang="ts">
import { onBeforeMount } from 'vue'
import FormManagement from './components/FormManagement/FormManagement.vue'
import { useFormManagementStore } from './stores/form-management'
const { checkLocalStorage } = useFormManagementStore()

onBeforeMount(() => {
  checkLocalStorage()
})
</script>

<template>
  <div class="app">
    <FormManagement />
  </div>
</template>

<style scoped lang="scss">
.app {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
