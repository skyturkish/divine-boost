
<script setup>
import { findDominantColorByDivisionName } from '@/constants/league-of-legends-constants'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

</script>

<template lang="pug">
.order-process
  .order-coach(v-if="order.category == 'coaching'")
    .column
      .process-row
        h1 {{ order.orderType }}
  .division-process(v-if="order.orderType === 'division'")
    .column
      .process-row
        .current-rank
          img.rank-image(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/${order.game}/${order.currentRank.division}.webp`" alt="rank-image")
          .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division }} {{ order.currentRank.milestone }}
        svg(xmlns='http://www.w3.org/2000/svg' width='27' height='11' viewbox='0 0 27 11' fill='none')
          path(d='M25.8014 4.67596C26.3794 5.07331 26.3794 5.92669 25.8014 6.32404L20.5665 9.92301C19.903 10.3792 19 9.90415 19 9.09897L19 1.90103C19 1.09585 19.903 0.620831 20.5665 1.07699L25.8014 4.67596Z' fill='#333333')
          rect(y='4' width='21' height='3' rx='1' fill='#333333')
        .desired-rank
          img.rank-image(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/${order.game}/${order.desiredRank.division}.webp`" alt="rank-image")
          .rank-name(:style="{color: (findDominantColorByDivisionName(order.desiredRank.division))}") {{ order.desiredRank.division }} {{ order.desiredRank.milestone }}
      .process-bar
  .wind-and-placement-process(v-else-if="order.orderType === 'win' || order.orderType === 'placements' " )
    .column
      .process-row
        .current-rank
          img.rank-image(:src="`https://storage.googleapis.com/divine-boost-bucket/assets/assets/ranks/${order.game}/${order.currentRank.division}.webp`" alt="rank-image")
          .rank-name(:style="{color: (findDominantColorByDivisionName(order.currentRank.division))}") {{ order.currentRank.division }} {{ order.currentRank.milestone }}
        .amount-game(:style="{ border: 'solid 2px ' + findDominantColorByDivisionName(order.currentRank.division) , boxShadow: '0 0 8px 0' + findDominantColorByDivisionName(order.currentRank.division)}")
          .column
            .amount(v-if="order.orderType == 'lesson'") {{ order.hours.split(' ')[0] }}
            .amount(v-else) {{ order.amountGame.split(' ')[0] }}
            .games GAMES
  .normal-game-process(v-else-if="order.orderType === 'normal-game'")
    .column
      .process-row
        h1 normal
</template>

<style scoped>
.order-process {
 max-height: 200px;
}
.process-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.process-row > * {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rank-image {
  height: 150px;
  width: 150px;
}
.rank-name {

  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}
.amount-game {
  width: 100px;
  height: 100px;
  box-shadow: 0 0 8px 0 rgba(255, 168, 0, 0.5);
  border: solid 2px #eeaf0c;
  border-radius:60px;
}
.amount {
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  color: #51341e;
}
.games {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #a98b3e;
}
</style>
