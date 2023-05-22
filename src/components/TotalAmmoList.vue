<script setup>
import { useStore } from 'vuex';
import { ref,computed } from 'vue';

const store = useStore();
let ammo = computed(()=>{
  let results = [];
  let calibers = store.state.calibers;
  let groups = _groupBy(store.state.ammo,"Caliber");
  let keys = Object.keys(groups);
  for(let i in keys){
    let caliberId = groups[keys[i]][0].Caliber;
    let caliber = calibers.filter((e)=>{ return e.Id == caliberId})[0].Label;
    let rounds = groups[keys[i]].reduce((acc,e)=>{
      return acc += parseInt(e.Rounds);
    },0);
    results.push({Id:groups[keys[i]][0].Id,Caliber:caliber,Rounds:rounds});
  }
  return results;
});

function _groupBy(objectArray,targetProperty){
  return objectArray.reduce((acc,obj)=>{
    const key = obj[targetProperty];
    if(!acc[key]){
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  },{});
}

// console.log(ammo.value);

</script>

<template>
  <v-card>
    <v-card-title>Ammo Totals</v-card-title>
    <v-card-text>
      <v-list lines="one">
        <v-list-item v-for="a in ammo" :key="a.Id" :title="a.Caliber" :subtitle="a.Rounds"></v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>
