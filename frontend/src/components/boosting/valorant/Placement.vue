<script setup>
import CurrentRank from '@/components/boosting/valorant/CurrentRank'
import Checkout from '@/components/Checkout'
import SelectAmountPlacementsGame from '@/components/boosting/valorant/SelectAmountPlacementsGame'
import SelectServer from '@/components/boosting/valorant/SelectServer'
import SelectBooster from '@/components/boosting/valorant/SelectBooster'
import SelectAgents from '@/components/boosting/valorant/SelectAgents'
import Premium from '@/components/boosting/valorant/Premium'
import HighMmrAndSoloOnly from '@/components/boosting/valorant/HighMmrAndSoloOnly'
import UntrackableOrStream from '@/components/boosting/valorant/UntrackableOrStream'
import CustomSwitch from '@/components/CustomSwitch'
import { useValorantOrder } from '@/store/valorant-order'
import { useRouter } from 'vue-router'

const currentValorantOrder = useValorantOrder()
const router = useRouter()

async function createOrder() {
  router.push({
    path: `/complete-payment/valorant/placements`,
  })
}
</script>

<template lang="pug">
CurrentRank(title="LAST SEASON" divisionLimit="9")
  SelectServer
  SelectAmountPlacementsGame
Checkout(v-on:create-order="createOrder" checkoutTextColor='#280000' game='valorant' :order='currentValorantOrder.placementsOrder')
  template(v-slot:switchs)
    .custom-switch-two-options
      .choice SOLO
      CustomSwitch(v-model="currentValorantOrder.isDuo")
      .choice DUO
  template(v-slot:options)
    SelectBooster
    SelectAgents
    Premium
    HighMmrAndSoloOnly
    UntrackableOrStream
</template>

<style scoped>

</style>