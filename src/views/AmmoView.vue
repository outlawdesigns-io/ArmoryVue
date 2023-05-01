<script>
import AmmoForm from '../components/AmmoForm.vue';
import AmmoPurchaseForm from '../components/AmmoPurchaseForm.vue';
// import ReceiveAmmoForm from '../components/ReceiveAmmoForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

export default{
  name:'AmmoView',
  components:{
    AmmoForm,
    AmmoPurchaseForm
  },
  props:{},
  computed:{
    ammo(){
      let manufacturers = this.$store.state.manufacturers;
      let calibers = this.$store.state.calibers;
      return this.$store.state.ammo.map((a)=>{
        a.ManufacturerObj = manufacturers.filter((m)=>{ return m.Id == a.Manufacturer})[0];
        a.CaliberObj = calibers.filter((c)=>{ return c.Id == a.Caliber})[0];
        a.Display = a.CaliberObj.Label + ' | ' + a.ManufacturerObj.Name + ' | ' + a.Casing + ' (' + a.Rounds + ')';
        return a
      });
    },
    pendingPurchases(){
      return this.$store.state.ammoPurchases.filter((e)=>{
        let date = new Date(e.DateReceived);
        return isNaN(date.getTime());
      }).map((a)=>{
        a.Display = a.DatePurchased;
        return a;
      });
    }
  },
  methods:{
    setEdit(id){
      this.editId = id;
    },
    toggleNewForm(){
      this.newRecord = !this.newRecord;
    },
    toggleNewPurchase(){
      this.newPurchase  = !this.newPurchase;
    },
    toggleDeliveries(){
      this.waitingDeliveryView = !this.waitingDeliveryView;
    }
  },
  data: ()=> ({editId:null,newRecord:false,newPurchase:false,waitingDeliveryView:false}),
}

</script>

<template>
  <v-btn @click="toggleNewForm">Add Ammo Type</v-btn>
  <v-btn @click="toggleNewPurchase">Add Ammo</v-btn>
  <v-btn @click="toggleDeliveries">Manage Deliveries</v-btn>
  <div v-if="newRecord">
    <b>New Ammo:</b>
    <AmmoForm></AmmoForm>
  </div>
  <div v-if="newPurchase">
    <b>New Purchase:</b>
    <AmmoPurchaseForm></AmmoPurchaseForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list v-if="!waitingDeliveryView">
    <v-list-item v-for="i in ammo" :key="i.Id" :title="i.Display" :class="{selected:i.Id == editId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-bullet</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(i.Id)"></v-btn>
    </template>
    <div v-if="i.Id == editId">
      <AmmoForm :populateWith="i"></AmmoForm>
    </div>
    </v-list-item>
  </v-list>
  <v-list v-if="waitingDeliveryView">
    <v-list-item v-for="i in pendingPurchases" :key="i.Id" :title="i.Display" :class="{selected:i.Id == editId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-bullet</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(i.Id)"></v-btn>
    </template>
    <div v-if="i.Id == editId">
      <AmmoPurchaseForm :populateWith="i"></AmmoPurchaseForm>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
