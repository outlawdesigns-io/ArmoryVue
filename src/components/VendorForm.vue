<script>

import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default{
  //these forms should propbably emit something up so that parents can react.
  name:'VendorForm',
  components:[],
  props:{
    populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  },
  computed:{},
  methods:{
    async submit(event){
      const valid = await this.$refs.form.validate();
      if(!valid.valid) return;
      let promise;
      if(!this.editing){
        promise = this.$store.dispatch('addVendor',this.form);
      }else{
        promise = this.$store.dispatch('updateVendor',this.form);;
      }
      try{
        await promise;
        toast("Changes Saved!",{type:'success',autoClose:2000});
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
        return;
      }
      this.editId = null;
      this.editing = false;
      Object.keys(this.form).forEach((k)=>{this.form[k] = null});
    },
    async deleteItem(Id){
      try{
        this.$store.dispatch('deleteVendor',Id);
        toast("Changes Saved!",{type:'success',autoClose:2000});
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
        return;
      }
    }
  },
  mounted(){},
  created(){
    if(!this.populateWith.empty){
      this.form = this.populateWith;
      this.editId = this.populateWith.Id;
      this.editing = true;
    }
  },
  data(){
    return {
      editing:false,
      form:{
        Name:null,
        Website:null
      },
      nameRules:[
        value => {
          if(value) return true
          return "Name is required"
        }
      ]
    }
  }

}

</script>

<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
          <v-text-field v-model="form.Name" :rules="nameRules" label="Name"></v-text-field>
          <v-text-field v-model="form.Website" label="Website"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">Submit</v-btn>
        <v-btn v-if="editing" @click="deleteItem(form.Id)">Delete</v-btn>
        <!-- <v-btn>Cancel</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-form>
</template>
