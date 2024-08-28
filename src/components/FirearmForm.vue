<script>

import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default{
  name:'FirearmForm',
  components:[],
  props:{
    populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  },
  computed:{
    manufacturers(){
      return this.$store.state.manufacturers.filter((e)=>{ return e.Firearm });
    },
    calibers(){
      return this.$store.state.calibers;
    },
    optics(){
      return this.$store.state.optics;
    },
  },
  methods:{
    async submit(event){
      const valid = await this.$refs.form.validate();
      if(!valid.valid){
        return;
      }
      try{
        if(!this.editing){
          await this.$store.dispatch('addFirearm',this.form);
          Object.keys(this.form).forEach((k)=>{this.form[k] = null});
        }else{
          await this.$store.dispatch('updateFirearm',this.form);
          //this.editing = false;
        }
        toast("Changes Saved!",{type:'success',autoClose:2000});
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
      }
    },
    async deleteItem(Id){
      try{
        this.$store.dispatch('deleteFirearm',Id);
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
      this.editing = true;
    }
  },
  data(){
    return {
      editing:false,
      form:{
        Manufacturer:null,
        Caliber:null,
        Model:null,
        Serial_Number:null,
        CurrentOptic:null,
        LinkToProduct:null
      },
      manufacturerRules:[
        value => {
          if(value) return true
          return "Manufacturer is required"
        }
      ],
      caliberRules:[
        value => {
          if(value) return true;
          return "Caliber is required"
        }
      ],
      modelRules:[
        value => {
          if(value) return true;
          return "Model is required"
        }
      ],
    }
  }

}

</script>

<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-select v-model="form.Manufacturer" :rules="manufacturerRules" label="Manufacturer" :items="manufacturers" item-title="Name" item-value="Id"></v-select>
        <v-select v-model="form.Caliber" :rules="caliberRules" label="Caliber" :items="calibers" item-title="Label" item-value="Id"></v-select>
        <v-text-field v-model="form.Model" :rules="modelRules" label="Model"></v-text-field>
        <v-text-field v-model="form.Serial_Number" label="Serial Number"></v-text-field>
        <v-select v-model="form.CurrentOptic" label="Current Optic" :items="optics" item-title="Name" item-value="Id"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">Submit</v-btn>
        <v-btn v-if="editing" @click="deleteItem(form.Id)">Delete</v-btn>
        <!-- <v-btn>Cancel</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-form>
</template>
