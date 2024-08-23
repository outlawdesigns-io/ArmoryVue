<script setup>
import { useStore } from 'vuex';
import { ref,computed } from 'vue';

const store = useStore();

let totalRoundsShot = computed(()=>{
  return store.state.shoots.reduce((acc,e)=>{
    return acc += parseInt(e.Rounds);
  },0);
});

let shoots = computed(()=>{
  let results = {};
  store.state.shoots.map((e)=>{
    let dateStr = new Date(e.Created).toDateString();
    if(results[dateStr]){
      results[dateStr] += parseInt(e.Rounds);
    }else{
      results[dateStr] = parseInt(e.Rounds);
    }
  });
  return results;
});

</script>

<template>
  <v-card>
    <v-card-title>Shoots</v-card-title>
    <v-card-text>
      <v-list lines="one">
        <v-list-item v-for="(rounds,date) in shoots" :key="date" :title="date" :subtitle="rounds"></v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>Total Rounds: {{totalRoundsShot}}</v-card-actions>
  </v-card>
</template>
