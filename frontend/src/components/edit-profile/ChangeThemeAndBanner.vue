

<script setup>
import { ref } from 'vue'
import { useAccount } from '@/store/account'
import { banners } from '@/constants/banners'

const useAccountStore = useAccount()
const themeDialog = ref(false)

async function changeBannerAndCloseDialog(banner) {
  await useAccountStore.updateThemePreference(banner)
  themeDialog.value = false
}
</script>

<template lang="pug">
.theme
  .theme-background(:style="{ backgroundImage: `url(https://storage.googleapis.com/divine-boost-bucket/assets/assets/banners/${useAccountStore.user.themePreference.path}.webp)`}")
    .text CHANGE THEME AND BANNER
  v-dialog(v-model='themeDialog' activator='parent' width='auto')
    v-card.row
      .theme-background(v-for="banner in banners" :style="{ backgroundImage: `url(https://storage.googleapis.com/divine-boost-bucket/assets/assets/banners/${banner.path}.webp)`}" @click="changeBannerAndCloseDialog(banner)")
</template>

<style scoped>
.theme-background {
  border-radius: 15px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 75px 75px;
  border: solid 1px #905939;
  text-shadow: 0 0 10px #000;
  background-size: cover;
  display:flex;
  justify-content: center;
}

</style>
