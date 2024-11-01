<script>
import FirearmForm from '../components/FirearmForm.vue';
import { useStore } from 'vuex';

import {computed} from 'vue';

import CommonMethods from '../CommonMethods';

export default{
  name:'FirearmView',
  components:{
    FirearmForm
  },
  props:{},
  computed:{
    firearms(){
      return this.$store.state.firearms.map((f)=>{ f.Display = f.Model + " | " + f.Serial_Number; return f});
    },
    images(){
      return this.$store.state.images.filter((e)=>{ return e.Firearm == this.editId}).map((e)=>{ e.imgStr = 'data:image/png;base64,' + CommonMethods.bufferToBase64(e.BinaryData.data); return e });
    },
    hasImages(){
      return this.$store.state.images.length > 0;
    },
    fetchingImages(){
      return this.$store.state.fetchingImages;
    }
  },
  methods:{
    setEdit(id){
      this.editId = this.editId == id ? null:id;
      this.$store.dispatch('getFirearmImages',this.editId);
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
      <v-carousel v-if="hasImages && !fetchingImages">
        <v-carousel-item v-for="j in images" :src="j.imgStr"></v-carousel-item>
      </v-carousel>
      <div id="loading" v-if="fetchingImages">
        <span>Fetching Images...</span>
      </div>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
