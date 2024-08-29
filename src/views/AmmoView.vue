<script>
import AmmoForm from '../components/AmmoForm.vue';
import AmmoPurchaseForm from '../components/AmmoPurchaseForm.vue';
// import ReceiveAmmoForm from '../components/ReceiveAmmoForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

import CommonMethods from '../CommonMethods';

export default{
  name:'AmmoView',
  components:{
    AmmoForm,
    AmmoPurchaseForm
  },
  props:{},
  computed:{
    ammo(){
      let results = [];
      let calibers = this.$store.state.calibers;
      let groups = CommonMethods.groupBy( this.showZeroRounds ? this.$store.state.ammo:this.$store.state.ammo.filter((a)=>{ return a.Rounds > 0}),"Caliber");
      let keys = Object.keys(groups);
      for(let i in groups){
        let caliber = calibers.filter((e)=>{ return e.Id == i})[0];
        let ammos = groups[i].map(this._mapAmmoAdditionalProperties);
        results.push({Caliber:caliber,Ammos:ammos});
      }
      return results;
    },
    pendingPurchases(){
      let vendors = this.$store.state.vendors;
      let calibers = this.$store.state.calibers;
      let ammos = this.$store.state.ammo;
      return this.$store.state.ammoPurchases.filter(CommonMethods.isNotReceived).map((a)=>{
        let ammoObj = ammos.filter((am)=>{ return am.Id == a.Ammo})[0];
        let caliberObj = calibers.filter((c)=>{ return c.Id == ammoObj.Caliber})[0];
        let vendorObj = vendors.filter((v)=>{ return v.Id == a.Vendor})[0];
        a.Display = vendorObj.Name + ' | ' + caliberObj.Label + ' | ' + a.DatePurchased.split(' ')[0] + '(' + a.Rounds + ')';
        return a;
      });
    }
  },
  methods:{
    _mapAmmoAdditionalProperties(a){
      let manufacturers = this.$store.state.manufacturers;
      let calibers = this.$store.state.calibers;
      a.ManufacturerObj = manufacturers.filter((m)=>{ return m.Id == a.Manufacturer})[0];
      a.CaliberObj = calibers.filter((c)=>{ return c.Id == a.Caliber})[0];
      a.Display = a.CaliberObj.Label + ' | ' + a.ManufacturerObj.Name + ' | ' + a.Casing + ' (' + a.Rounds + ')';
      return a
    },
    setEdit(id){
      this.editId = this.editId == id ? null:id;
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
  data: ()=> (
    {
      editId:null,
      newRecord:false,
      newPurchase:false,
      waitingDeliveryView:false,
      showZeroRounds:true
    }),
}

</script>

<template>
  <v-btn @click="toggleNewForm">Add Ammo Type</v-btn>
  <v-btn @click="toggleNewPurchase">Add Ammo</v-btn>
  <v-btn @click="toggleDeliveries">Manage Deliveries</v-btn>
  <v-checkbox v-if="!newRecord && !newPurchase && !waitingDeliveryView" v-model="showZeroRounds" label="Show Zero Rounds"></v-checkbox>
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
    <v-list-group v-for="(group, itemIndex) in ammo" Value="group.Caliber.Label">
      <template v-slot:activator="{props}">
        <v-list-item :title="group.Caliber.Label" :subtitle="group.Ammos.length" v-bind="props">
          <template v-slot:prepend>
            <v-avatar color="grey-lighten-1">
              <v-icon color="white">mdi-bullet</v-icon>
            </v-avatar>
          </template>
        </v-list-item>
      </template>
      <v-list-item v-for="a in group.Ammos" :key="a.Id" :title="a.Display" :subtitle="a.Rounds">
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-icon color="white">mdi-bullet</v-icon>
          </v-avatar>
        </template>
        <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(a.Id)"></v-btn>
      </template>
      <div v-if="a.Id == editId">
        <AmmoForm :populateWith="a"></AmmoForm>
      </div>
      </v-list-item>
    </v-list-group>
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
