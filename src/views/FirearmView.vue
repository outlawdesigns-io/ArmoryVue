<script>
import FirearmForm from '../components/FirearmForm.vue';
import FirearmImageCarousel from '../components/FirearmImageCarousel.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

import CommonMethods from '../CommonMethods';

export default{
  name:'FirearmView',
  components:{
    FirearmForm,
    FirearmImageCarousel
  },
  props:{},
  computed:{
    /*firearms(){
      return this.$store.state.firearms.map((f)=>{ f.Display = f.Model + " | " + f.Serial_Number; return f});
    },*/
    firearms(){
      let calibers = this.$store.state.calibers;
      let results = {};
      this.$store.state.firearms.map((e)=>{
        e.Display = e.Model + " | " + e.Serial_Number;
        let caliberObj = calibers.filter((c)=>{ return c.Id == e.Caliber})[0];
        if(results[caliberObj.Label]){
          results[caliberObj.Label].push(e);
        }else{
          results[caliberObj.Label] = [e];
        }
      });
      return results;
    }
  },
  methods:{
    setEdit(id){
      this.editId = this.editId == id ? null:id;
      this.$store.dispatch('getFirearmImages',this.editId);
    },
    toggleNewForm(){
      this.newRecord = !this.newRecord;
    }
  },
  data: ()=> ({editId:null,newRecord:false}),
}

</script>

<template>
  <v-btn @click="toggleNewForm">New</v-btn>
  <div v-if="newRecord">
    <b>New Firearm:</b>
    <FirearmForm></FirearmForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list>
    <v-list-group v-for="(group, caliberStr) in firearms" Value="itemIndex">
      <template v-slot:activator="{props}">
        <v-list-item :title="caliberStr" :subtitle="group.length" v-bind="props"></v-list-item>
      </template>
      <v-list-item v-for="i in group" :key="i.Id" :title="i.Display" :class="{selected:i.Id == editId}">
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-icon color="white">mdi-pistol</v-icon>
          </v-avatar>
        </template>
        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(i.Id)"></v-btn>
      </template>
      <div v-if="i.Id == editId">
        <FirearmForm :populateWith="i"></FirearmForm>
        <FirearmImageCarousel :populateWith="{FirearmId:i.Id}"></FirearmImageCarousel>
      </div>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
