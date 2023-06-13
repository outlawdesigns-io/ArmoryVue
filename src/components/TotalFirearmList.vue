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
  console.log(results);
  return [
    {Caliber:{ Id:1, Label:'7.62x39' },Firearms:[
      {
        Id:2,
        Manufacturer:6,
        Caliber:1,
        Model:'AK-47',
        Serial_Number:'S0001BJZ'
      },
      {
        Id:2,
        Manufacturer:6,
        Caliber:1,
        Model:'AK-47',
        Serial_Number:'X0002ZYN'
      }
    ]},
    {Caliber:{ Id:2, Label:'.223 REM' },Firearms:[]},
    {Caliber:{ Id:3, Label:'5.56x45 Nato' },Firearms:[]},
    {Caliber:{ Id:4, Label:'9mm Luger' },Firearms:[]},
    {Caliber:{ Id:5, Label:'9mm Nato' },Firearms:[]},
    {Caliber:{ Id:6, Label:'.40 S&W' },Firearms:[]},
    {Caliber:{ Id:7, Label:'20 Gauge' },Firearms:[]}
  ];
  // return groups;
  // return store.state.firearms;
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

//console.log(firearmsByCaliber.value);

</script>

<template>
  <v-card>
    <v-card-title>Firearms</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-group v-for="(Caliber,Firearms) in firearmsByCaliber">
          <v-list-item v-for="f in Firearms" :key="f.Id" :title="f.Model" :subtitle="f.Serial_Number"></v-list-item>
        </v-list-group>
        <!-- <v-list-item v-for="(Caliber,Firearms) in firearmsByCaliber" :title="Caliber.Label" :value="Caliber.Label">{{Caliber}}</v-list-item> -->
      </v-list>
      <!-- <v-list lines="one"><v-list-item v-for="f in firearmsByCaliber" :key="f.Id" :title="f.Model" :subtitle="f.Serial_Number"></v-list-item></v-list> -->
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>
