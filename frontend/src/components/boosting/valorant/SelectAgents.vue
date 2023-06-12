<script setup>
import { ref, computed } from 'vue'
import { useValorantOrder } from '@/store/valorant-order'
import CheckoutSelection from '@/components/CheckoutSelection'
import { agents } from '@/constants/valorant-constants'

const currentValorantOrder = useValorantOrder()
const dialog = ref(false)
const searchName = ref('')

const filteredAgents = computed(() => {
    return agents.filter((agent) => {
        return agent.toLowerCase().includes(searchName.value.toLowerCase())
    })
})
</script>

<template lang="pug">
CheckoutSelection(toolTipText="You can set your agents which ones you wanted to play by boosters" title="AGENTS")
  v-img.logo(v-if="!currentValorantOrder.isAnyAgentSelected()" src='@/assets/icons/plus.png' width="50px")
  v-img.logo(v-else src='@/assets/squares/valorant/sage.png' width="50px")
  v-dialog(v-model='dialog' activator='parent' width='auto')
    v-card
      .row
        .title(@click="selamla") SELECT AGENTS
        v-tooltip(location="right" text='You can your agents bla bla bla ' )
          template(v-slot:activator='{ props }')
            .question-mark
              v-img(src="@/assets/icons/question-mark.png" v-bind='props')
      .filters
        v-text-field.search(label="Search for agents" v-model="searchName")
      .champions-background
        .champions
          .champion(v-for="agent in filteredAgents")
            v-img(:src='`../../../src/assets/squares/valorant/${agent}.png`' @click="currentValorantOrder.addAgent(agent)")
      v-divider
      .last-row
        .champion(v-for="agent in currentValorantOrder.agents")
          v-img(:src='`../../../src/assets/squares/valorant/${agent}.png`')
</template>

<style scoped>
.logo {
  cursor: pointer;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem 1rem 3rem;
}
.v-card {
  width: 900px;
  min-height: 900px;
  max-height: 1700px;
  border-radius: 5px;
  background-color: #fff;
  font-family: Inter;
}
.title {
  font-size: 40px;
  font-weight: bold;
  color: #222;
}
.question-mark {
  height: 3rem;
  width: 3rem;
}
.filters {
  height: 120px;
  background-color: #eee;
  padding: 2rem 2rem 2rem 2rem;
  display: flex;
  justify-content: space-between;
}
.search {
  width: 260px;
  height: 60px;
  flex-grow: 0;
  border-radius: 5px;
  background-color: #fff;
}
.champions-background {
  height: 36rem;
}
.champions {
  height: min-content;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  gap: 1rem;
}
.champion {
  height: 4rem;
  width: 4rem;
}
.last-row {
  display: flex;
  gap: 1rem;
  margin: auto 0;
  padding: 0 2rem;
}
</style>