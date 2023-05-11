<script>
import VendorForm from '../components/VendorForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

export default{
  name:'VendorView',
  components:{
    VendorForm
  },
  props:{},
  computed:{
    vendors(){
      return this.$store.state.vendors;
    }
  },
  methods:{
    setEdit(id){
      this.editId = this.editId == id ? null:id;
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
    <b>New Vendor:</b>
    <VendorForm></VendorForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list>
    <v-list-item v-for="i in vendors" :key="i.Id" :title="i.Name" :class="{selected:i.Id == editId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-factory</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(i.Id)"></v-btn>
    </template>
    <div v-if="i.Id == editId">
      <VendorForm :populateWith="i"></VendorForm>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
