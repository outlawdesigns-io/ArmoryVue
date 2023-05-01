<script>
import CaliberForm from '../components/CaliberForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

export default{
  name:'CaliberView',
  components:{
    CaliberForm
  },
  props:{},
  computed:{
    calibers(){
      return this.$store.state.calibers;
    }
  },
  methods:{
    setEdit(id){
      this.editId = id;
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
    <b>New Caliber:</b>
    <CaliberForm></CaliberForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list>
    <v-list-item v-for="i in calibers" :key="i.Id" :title="i.Label" :class="{selected:i.Id == editId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-bullet</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(i.Id)"></v-btn>
    </template>
    <div v-if="i.Id == editId">
      <CaliberForm :populateWith="i"></CaliberForm>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
