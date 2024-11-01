<script>
import ShootForm from '../components/ShootForm.vue';
import ShootDetails from '../components/ShootDetails.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

import CommonMethods from '../CommonMethods';

export default{
  name:'ShootView',
  components:{
    ShootForm,
    ShootDetails
  },
  props:{},
  computed:{
    shoots(){
      let results = {};
      let ammo = this.$store.state.ammo;
      let firearms = this.$store.state.firearms;
      let manufacturers = this.$store.state.manufacturers;
      this.$store.state.shoots.map((e)=>{
        let ammoObj = ammo.filter((a)=>{ return a.Id == e.Ammo })[0];
        let firearmObj = firearms.filter((f)=>{ return f.Id == e.FireArm })[0];
        let firearmManufacturerObj = manufacturers.filter((m)=>{ return m.Id == firearmObj.Manufacturer })[0];
        e.Display = `${CommonMethods.dateToTimeStr(e.Created)}: ${firearmManufacturerObj.Name} ${firearmObj.Model} | ${e.Rounds}`;
        let dateStr = new Date(e.Created).toDateString();
        if(results[dateStr]){
          results[dateStr].push(e);
        }else{
          results[dateStr] = [e];
        }
      });
      return results;
    },
    targets(){
      return this.$store.state.images.filter((e)=>{ return e.ShootId == this.selectedId}).map((e)=>{ e.imgStr = 'data:image/png;base64,' + CommonMethods.bufferToBase64(e.BinaryData.data); return e });
    },
    hasTargets(){
      //we need a way to know if we're currently fetching targets.
      return this.$store.state.images.length > 0;
    },
    fetchingImages(){
      return this.$store.state.fetchingImages;
    }
  },
  methods:{
    setSelected(id){
      this.selectedId = this.selectedId == id ? null:id;
      this.$store.dispatch('getShootTargets',this.selectedId);
    },
    toggleNewForm(){
      this.newRecord = !this.newRecord;
    },
    sumRounds(shootArray){
      return shootArray.reduce(CommonMethods.sumRounds,0);
    },
    buildSubtitleStr(shootArray){
      return `Entries: ${shootArray.length}, Total Rounds: ${shootArray.reduce(CommonMethods.sumRounds,0)}`;
    }
  },
  data: ()=> ({selectedId:null,newRecord:false}),
}

</script>

<template>
  <v-btn @click="toggleNewForm">New</v-btn>
  <div v-if="newRecord">
    <b>New Shoot:</b>
    <ShootForm></ShootForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list>
    <v-list-group v-for="(group, dateStr) in shoots" Value="itemIndex">
      <template v-slot:activator="{props}">
        <v-list-item :title="dateStr" :subtitle="buildSubtitleStr(group)" v-bind="props"></v-list-item>
      </template>
      <v-list-item v-for="s in group" :key="s.Id" :title="s.Display">
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-icon color="white">mdi-target</v-icon>
          </v-avatar>
        </template>
        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-camera" variant="text" @click="setSelected(s.Id)"></v-btn>
      </template>
      <div v-if="s.Id == selectedId">
        <ShootDetails :populateWith="s"></ShootDetails>
        <v-carousel v-if="hasTargets && !fetchingImages">
          <v-carousel-item v-for="j in targets" :src="j.imgStr"></v-carousel-item>
        </v-carousel>
        <div id="loading" v-if="fetchingImages">
          <span>Fetching Targets...</span>
        </div>
      </div>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
#loading{
  /* margin:auto; */
  text-align: center;;
}
</style>
