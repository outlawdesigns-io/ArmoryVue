<script setup>

import { useStore } from 'vuex';
import { ref,computed } from 'vue';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const store = useStore();

const props = defineProps({populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  }
);

const manufacturers = computed(()=>{
  return store.state.manufacturers.filter((e)=>{ return e.Optic });
});

const formRef = ref(null);

const form = ref({
  Id:props.populateWith.empty ? null:props.populateWith.Id,
  Manufacturer:props.populateWith.empty ? null:props.populateWith.Manufacturer,
  Name:props.populateWith.empty ? null:props.populateWith.Name,
  MagnificationTimes:props.populateWith.empty ? null:props.populateWith.MagnificationTimes,
  LinkToProduct:props.populateWith.empty ? null:props.populateWith.LinkToProduct
});

let editing = ref(props.populateWith.empty ? false:true);

let numberRules = ref([
  value =>{
    if(value) return true;
    return "Number fields are required"
  }
]);

const submit = async () => {
  if(formRef.value && (await formRef.value.validate()).valid){
    try{
      if(editing.value){
        await store.dispatch('updateOptic',form.value);
      }else{
        await store.dispatch('addOptic',form.value);
        Object.keys(form.value).forEach((k)=>{form.value[k] = null});
      }
      toast("Changes Saved!",{type:'success',autoClose:2000});
    }catch(err){
      toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
    }
  }
}

async function deleteItem(Id){
  try{
    store.dispatch('deleteOptic',Id);
    toast("Changes Saved!",{type:'success',autoClose:2000});
  }catch(err){
    toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
    return;
  }
}

</script>

<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-select v-model="form.Manufacturer" label="Manufacturer" :items="manufacturers" item-title="Name" item-value="Id"></v-select>
        <v-text-field v-model="form.Name" label="Name"></v-text-field>
        <v-text-field v-model="form.MagnificationTimes" label="Magnification X" type="number" :rules="numberRules"></v-text-field>
        <v-text-field v-model="form.LinkToProduct" label="Link to Product"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">Submit</v-btn>
        <v-btn v-if="editing" @click="deleteItem(form.Id)">Delete</v-btn>
        <!-- <v-btn>Cancel</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-form>
</template>
