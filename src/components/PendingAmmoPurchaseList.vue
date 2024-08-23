<script setup>
import { useStore } from 'vuex';
import { ref,computed } from 'vue';

const store = useStore();

let ammoPurchases = computed(()=>{
  let purchases = store.state.ammoPurchases.filter(_isNotReceived).map(_mapAdditionalProperties);
  return purchases
});

let totalAmmo = computed(()=>{
  return store.state.ammoPurchases.filter(_isNotReceived).reduce((acc,e)=>{
    return acc += parseInt(e.Rounds);
  },0);
});

function _isNotReceived(e){
  let date = new Date(e.DateReceived);
  return isNaN(date.getTime());
}
function _mapAdditionalProperties(e){
  let manufacturers = store.state.manufacturers;
  let calibers = store.state.calibers;
  let vendors = store.state.vendors;
  let ammo = store.state.ammo.filter((a)=>{ return e.Ammo == a.Id})[0];
  e.CaliberObj = calibers.filter((c)=>{ return c.Id == ammo.Caliber})[0];
  e.ManufacturerObj = manufacturers.filter((m)=>{ return m.Id == ammo.Manufacturer})[0];
  e.VendorObj = vendors.filter((v)=>{ return v.Id == e.Vendor})[0];
  return e;
}

</script>

<template>
  <v-card>
    <v-card-title>Pending Orders</v-card-title>
    <v-card-text v-if="ammoPurchases.length > 0">
      <v-list lines="one">
        <v-list-item v-for="a in ammoPurchases" :key="a.Id" :title="a.VendorObj.Name + ' | ' + a.DatePurchased" :subtitle="a.ManufacturerObj.Name + ', ' + a.CaliberObj.Label + ', ' + a.Rounds"></v-list-item>
      </v-list>
    </v-card-text>
    <v-card-text v-else>
      <p>No Pending Orders</p>
    </v-card-text>
    <v-card-actions v-if="ammoPurchases.length > 0">Total Rounds: {{totalAmmo}}</v-card-actions>
  </v-card>
</template>
