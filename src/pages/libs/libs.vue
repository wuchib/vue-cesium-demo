<template>
  <div class="p-4 flex gap-2 h-full">
    <div class="flex-1 overflow-auto">
      <button class="
        px-2 py-1 rounded-md
        btn-bg 
        btn-text
        transition-100
        text-14px
        text-[#ffffff]
        active:scale-95
      ">
        按钮
      </button>
    </div>
    <div ref="demo" class="flex-1 overflow-auto text-[#ffffff]">
      124456789
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, ref } from 'vue';



// TODO: add page logic here
</script>

<style scoped></style>
