<script>
import FirearmForm from '../components/FirearmForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

export default{
  name:'FirearmView',
  components:{
    FirearmForm
  },
  props:{},
  computed:{
    firearms(){
      return this.$store.state.firearms.map((f)=>{ f.Display = f.Model + " | " + f.Serial_Number; return f});
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
    <b>New Firearm:</b>
    <FirearmForm></FirearmForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list>
    <v-list-item v-for="i in firearms" :key="i.Id" :title="i.Display" :class="{selected:i.Id == editId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-pistol</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="setEdit(i.Id)"></v-btn>
    </template>
    <div v-if="i.Id == editId">
      <FirearmForm :populateWith="i"></FirearmForm>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
