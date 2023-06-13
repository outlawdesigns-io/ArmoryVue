<script>
import ShootForm from '../components/ShootForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

export default{
  name:'ShootView',
  components:{
    ShootForm
  },
  props:{},
  computed:{
    shoots(){
      let ammo = this.$store.state.ammo;
      let firearms = this.$store.state.firearms;
      return this.$store.state.shoots.map((e)=>{
        let ammoObj = ammo.filter((a)=>{ return a.Id == e.Ammo })[0];
        let firearmObj = firearms.filter((f)=>{ return f.Id == e.FireArm })[0];
        e.Display = firearmObj.Model + ' | ' + firearmObj.Serial_Number + ' | ' + e.Rounds + ' | ' + e.Created;
        //e.Display = e.Id;
        return e;
      });
    },
    targets(){
      return this.$store.state.targetImages.filter((e)=>{ return e.ShootId == this.selectedId}).map((e)=>{ e.imgStr = 'data:image/png;base64,' + this.bufferToBase64(e.BinaryData.data); return e });
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
    bufferToBase64(buff){
      return Array.prototype.map.call(buff,(ch)=>{ return String.fromCharCode(ch); }).join('');
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
    <v-list-item v-for="i in shoots" :key="i.Id" :title="i.Display" :class="{selected:i.Id == selectedId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-target</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-camera" variant="text" @click="setSelected(i.Id)"></v-btn>
    </template>
    <div v-if="i.Id == selectedId">
      <v-carousel>
        <v-carousel-item v-for="j in targets" :src="j.imgStr"></v-carousel-item>
      </v-carousel>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
