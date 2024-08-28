<script>

import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default{
  name:'AmmoForm',
  components:[],
  props:{
    populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  },
  computed:{
    manufacturers(){
      return this.$store.state.manufacturers.filter((e)=>{ return e.Ammo });
    },
    calibers(){
      return this.$store.state.calibers;
    }
  },
  methods:{
    async submit(event){
      const valid = await this.$refs.form.validate();
      if(!valid.valid){
        return;
      }
      try{
        if(!this.editing){
          await this.$store.dispatch('addAmmo',this.form);
          Object.keys(this.form).forEach((k)=>{this.form[k] = null});
        }else{
          await this.$store.dispatch('updateAmmo',this.form);
          //this.editing = false;
        }
        toast("Changes Saved!",{type:'success',autoClose:2000});
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
      }
    },
    async deleteItem(Id){
      try{
        this.$store.dispatch('deleteAmmo',Id);
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
        Manufacturer:null,
        Caliber:null,
        Model:null,
        Serial_Number:null,
      },
      manufacturerRules:[
        value => {
          if(value.Id !== null) return true
          return "Manufacturer is required"
        }
      ],
      caliberRules:[
        value => {
          if(value.Id !== null) return true;
          return "Caliber is required"
        }
      ],
      numberRules:[
        value =>{
          if(value) return true;
          return "Number fields are required"
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
        <v-text-field v-model="form.BulletWeight" label="Bullet Weight" type="number" :rules="numberRules"></v-text-field>
        <v-text-field v-model="form.Casing" label="Casing"></v-text-field>
        <v-text-field v-model="form.BulletType" label="BulletType"></v-text-field>
        <v-text-field v-model="form.MuzzleVelocity" label="MuzzleVelocity" type="number" :rules="numberRules"></v-text-field>
        <v-text-field v-model="form.Rounds" label="Rounds" type="number" :rules="numberRules"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">Submit</v-btn>
        <v-btn v-if="editing" @click="deleteItem(form.Id)">Delete</v-btn>
        <!-- <v-btn>Cancel</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-form>
</template>
