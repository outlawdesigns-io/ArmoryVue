<script setup>

import { useStore } from 'vuex';
import { ref,computed } from 'vue';
import CommonMethods from '../CommonMethods';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore();

const props = defineProps({populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  }
);

const images = computed(()=>{
  return store.state.images.filter((e)=>{ return e.Firearm == props.populateWith.FirearmId}).map((e)=>{ e.imgStr = 'data:image/png;base64,' + CommonMethods.bufferToBase64(e.BinaryData.data); return e });
});

const hasImages = computed(()=>{
  return store.state.images.length > 0;
});

const fetchingImages = computed(()=>{
  return store.state.fetchingImages;
});

const deleteImage = async (id) => {
  try{
    await store.dispatch('deleteFirearmImage',id);
    toast("Changes Saved!",{type:'success',autoClose:2000});
  }catch(err){
    toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
  }
}

</script>

<template>
  <v-carousel v-if="hasImages && !fetchingImages">
    <v-carousel-item v-for="j in images" :src="j.imgStr">
      <v-btn v-if="hasImages && !fetchingImages" id="deleteImgBtn" @click="deleteImage(j.Id)">Delete Image</v-btn>
    </v-carousel-item>
  </v-carousel>
  <div id="loading" v-if="fetchingImages">
    <span>Fetching Images...</span>
  </div>
</template>

<style scoped>
#deleteImgBtn{
  width:100%;
}
</style>
