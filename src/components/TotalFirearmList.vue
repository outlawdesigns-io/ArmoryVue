<script setup>
import { useStore } from 'vuex';
import { ref,computed } from 'vue';

const store = useStore();
let firearmsByCaliber = computed(()=>{
  let results = [];
  let calibers = store.state.calibers;
  let groups = _groupBy(store.state.firearms,"Caliber");
  //groups.map((e)=>{ return calibers.filter((c)=>{ return c.Id == e.Caliber})[0];});
  //return groups;
  let keys = Object.keys(groups);
  for(let i in groups){
    //let caliberId = groups[keys[i]][0].Caliber;
    let caliber = calibers.filter((e)=>{ return e.Id == i})[0];
    //console.log(caliber);
    //let rounds = groups[keys[i]].reduce((acc,e)=>{ return acc += parseInt(e.Rounds); },0);
    // results.push({Id:groups[keys[i]][0].Id,Caliber:caliber,Rounds:rounds});
    results.push({Caliber:caliber,Firearms:groups[i]});
  }
  return groups;
  //return results;
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

console.log(firearmsByCaliber.value);

</script>

<template>
  <v-card>
    <v-card-title>Firearms</v-card-title>
    <v-card-text>
      <!-- <v-list-group v-for="caliber in firearmsByCaliber" :key="caliber" :title="caliber"></v-list-group> -->
      <!-- <v-list lines="one">
        <v-list-item v-for="caliber in firearmsByCaliber" :key="a.Id" :title="a.Caliber" :subtitle="a.Rounds"></v-list-item>
      </v-list> -->
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>
