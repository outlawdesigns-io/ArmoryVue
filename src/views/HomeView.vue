<script setup>
import { useStore } from 'vuex';

import TheWelcome from '../components/TheWelcome.vue'
import ManufacturerView from './ManufacturerView.vue'

const store = useStore();

//break these out into a store.init on prod
store.dispatch('getManufacturers');
store.dispatch('getCalibers');
store.dispatch('getFirearms');
store.dispatch('getAmmo');
store.dispatch('getVendors');
store.dispatch('getShoots');
store.dispatch('getAmmoPurchases');

</script>

<template>
  <!-- <ManufacturerView></ManufacturerView> -->
  <!-- <TheWelcome /> -->
</template>
