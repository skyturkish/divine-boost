<script setup>
import { useValorantOrder } from '@/store/valorant-order'

</script>

<template lang="pug">
v-select(v-model="useValorantOrder().languages" :items="['ENGLISH', 'TURKISH', 'ARABIC']" variant="outlined" bg-color="#F4F1F0")
</template>

<style scoped>

</style>
