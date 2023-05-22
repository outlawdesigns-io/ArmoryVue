<script setup>
// import { useStore } from 'vuex';
// import { ref,computed } from 'vue';

import TotalAmmoList from '../components/TotalAmmoList.vue';
import TotalFirearmList from '../components/TotalFirearmList.vue';


</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <TotalAmmoList></TotalAmmoList>
      </v-col>
      <v-col cols="12" sm="2">
        <TotalFirearmList></TotalFirearmList>
      </v-col>
      <v-col cols="12" sm="2"><p>Test</p></v-col>
      <v-col cols="12" sm="2"><p>Test</p></v-col>
      <v-col cols="12" sm="2"><p>Test</p></v-col>
      <v-col cols="12" sm="2"><p>Test</p></v-col>
    </v-row>
  </v-container>
</template>
