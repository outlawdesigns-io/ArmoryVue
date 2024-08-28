<script setup>
import { useStore } from 'vuex';
import { ref,computed } from 'vue';
import CommonMethods from '../CommonMethods';

const store = useStore();
let firearmsByCaliber = computed(()=>{
  let results = [];
  let calibers = store.state.calibers;
  let groups = CommonMethods.groupBy(store.state.firearms,"Caliber");
  let keys = Object.keys(groups);
  for(let i in groups){
    let caliber = calibers.filter((e)=>{ return e.Id == i})[0];
    let firearms = groups[i];
    firearms.forEach((f)=>{
      f.RoundsShot = store.state.shoots.reduce((acc,e)=>{
        if(e.FireArm == f.Id){
          acc += parseInt(e.Rounds);
        }
        return acc;
      },0);
    });
    results.push({Caliber:caliber,Firearms:firearms});
  }
  return results;
});

let totalFirearms = computed(()=>{
  return store.state.firearms.length;
});

</script>

<template>
  <v-card>
    <v-card-title>Firearms</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-group v-for="(group, itemIndex) in firearmsByCaliber" Value="group.Caliber.Label">
          <template v-slot:activator="{props}">
            <v-list-item :title="group.Caliber.Label" :subtitle="group.Firearms.length" v-bind="props"></v-list-item>
          </template>
          <v-list-item v-for="f in group.Firearms" :key="f.Id" :title="f.Model + ' | ' + f.Serial_Number" :subtitle="f.RoundsShot"></v-list-item>
        </v-list-group>
      </v-list>
    </v-card-text>
    <v-card-actions>Total Firearms:{{totalFirearms}}</v-card-actions>
  </v-card>
</template>
