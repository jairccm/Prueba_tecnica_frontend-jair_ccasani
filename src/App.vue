<template>
  <Menu></Menu>
  <div class="container mx-auto px-5">
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import Menu from '@/shared/MenuComponent.vue';
</script>
