<script setup>

import { useStore } from 'vuex';
import { ref,computed } from 'vue';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import CommonMethods from '../CommonMethods';

const store = useStore();

const props = defineProps({populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  }
);

const optics = computed(()=>{
  return store.state.optics;
});

const currentOptic = computed(()=>{
  return store.state.firearms.filter((e)=>{ return e.Id == form.value.FirearmId })[0].CurrentOptic;
});

const formRef = ref(null);

const form = ref({
  FirearmId:props.populateWith.empty ? null:props.populateWith.FirearmId,
  compress:true,
  useCurrentOptic:true,
  featuredOptic:null,
  images:[]
});

const submit = async () => {
  if(formRef.value && (await formRef.value.validate()).valid){
    let fileToUpload;
    try{
      for(let i = 0; i < form.value.images.length; i++){
        if(form.value.compress){
          fileToUpload = await CommonMethods.shrinkImage(form.value.images[i]);
        }else{
          fileToUpload = form.value.images[i];
        }
        let payload = {Firearm:form.value.FirearmId,Optic:form.value.useCurrentOptic ? currentOptic.value:form.value.featuredOptic,File:fileToUpload};
        await store.dispatch('addFirearmImage',payload);
        toast("Changes Saved!",{type:'success',autoClose:2000});
      }
    }catch(err){
      toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
    }
  }
}

</script>

<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-card>
      <v-card-title>Add Firearm Images</v-card-title>
      <v-card-text>
        <v-file-input v-model="form.images" show-size counter multiple label="Select Image(s)"></v-file-input>
        <v-checkbox v-model="form.compress" label="Compress"></v-checkbox>
        <v-checkbox v-model="form.useCurrentOptic" label="Image(s) include current optic"></v-checkbox>
        <v-select v-model="form.featuredOptic" label="Featured Optic" :items="optics" item-title="Name" item-value="Id" v-if="!form.useCurrentOptic"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<style scoped></style>
