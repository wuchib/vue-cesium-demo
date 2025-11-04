<template>
  <div class="flex w-full h-screen overflow-hidden">
    <aside class="bg-[#1f2430] text-white">
      <Menu />
    </aside>
    <main class="flex-1 overflow-auto bg-[#252526]">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Menu from './menu.vue'
</script>