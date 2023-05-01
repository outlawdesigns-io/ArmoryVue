<script>
import ManufacturerForm from '../components/ManufacturerForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

export default{
  name:'ManufacturerView',
  components:{
    ManufacturerForm
  },
  props:{},
  computed:{
    manufacturers(){
      return this.$store.state.manufacturers;
    }
  },
  methods:{
    setEdit(id){
      this.editId = id;
    }
  },
  data: ()=> ({editId:null,newRecord:false}),
}

</script>

<template>
  <v-btn @click="toggleNewForm">New</v-btn>
  <div v-if="newRecord">
    <b>New Vendor:</b>
    <ManufacturerForm></ManufacturerForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list>
    <v-list-item v-for="m in manufacturers" :key="m.Id" :title="m.Name" :class="{selected:m.Id == editId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-factory</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(m.Id)"></v-btn>
    </template>
    <div v-if="m.Id == editId">
      <ManufacturerForm :populateWith="m"></ManufacturerForm>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
