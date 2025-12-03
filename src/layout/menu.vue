<template>
  <div class="flex h-full w-52px">
    <nav class="flex flex-col justify-between items-center flex-1 flex-col gap-3 bg-[#212121] p-y-12px">
      <div class="flex flex-col items-center gap-20px">
        <!-- logo -->
        <div class="size-35px rounded-full overflow-hidden">
          <img class="size-100%" src="@/assets/logo.jpg" alt="">
        </div>
        <!-- menu -->
        <ul class="flex flex-col items-center gap-8px">
          <li 
            class="flex justify-center items-center size-30px rounded-md"
            :class="[route.name === item.name ? 'bg-[#3c3c3c]' : 'hover:bg-[#3c3c3c]']"
            v-for="item in menuList" 
            :key="item.value"
            @click="router.push(item.path)"
          >
            <div :class="item.icon" style="color: #fff;"></div>
          </li>
        </ul>
      </div>

      <!-- bottom -->
      <div>
        <ul class="flex flex-col items-center gap-8px">
          <li 
            class="flex justify-center cursor-pointer items-center size-30px rounded-md"
            v-for="item in linkList" 
            :key="item.value"
          >
            <div :class="item.icon" style="color: #fff;"></div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { childrenRoutes } from '@/router/routes'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()


const menuList = ref<any[]>(childrenRoutes.map(item => ({
  label: item.meta.label || '', 
  value: item.meta.title, 
  icon:  item.meta.icon,
  name: item.name,
  path: item.path
})))


const linkList = ref([
  { label: 'about', value: 'about', icon: 'i-ri:contacts-line',  },
  { label: 'github', value: 'github', icon: 'i-ri:github-line',  },
])
</script>
