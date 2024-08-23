<script>

import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default{
  name:'AmmoPurchaseForm',
  components:[],
  props:{
    populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  },
  computed:{
    vendors(){
      return this.$store.state.vendors;
    },
    ammo(){
      let manufacturers = this.$store.state.manufacturers;
      let calibers = this.$store.state.calibers;
      return this.$store.state.ammo.map((a)=>{
        a.ManufacturerObj = manufacturers.filter((m)=>{ return m.Id == a.Manufacturer})[0];
        a.CaliberObj = calibers.filter((c)=>{ return c.Id == a.Caliber})[0];
        a.Display = a.CaliberObj.Label + ' | ' + a.ManufacturerObj.Name + ' | ' + a.Casing + ' (' + a.Rounds + ')';
        return a
      });
    }
  },
  methods:{
    async submit(event){
      if(this.inPerson){
        this.form.DateReceived = this.form.DatePurchased;
      }else{
        //server will update ammo totals if this property is present (checks for undefined vs nullness)
        delete this.form.DateReceived;
      }
      //this.form.DateReceived = this.inPerson ? this.form.DatePurchased : null;
      const valid = await this.$refs.form.validate();
      if(!valid.valid) return;
      if(!this.editing){
        try{
          await this.$store.dispatch('addAmmoPurchase',this.form);
          toast("Changes Saved!",{type:'success',autoClose:2000});
        }catch(err){
          toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
          return;
        }
      }else{
        //none of this should ever execute. You can't edit an ammo purchase.
        try{
          await this.$store.dispatch('updateAmmoPurchase',this.form);
          toast("Changes Saved!",{type:'success',autoClose:2000});
          this.editing = false;
        }catch(err){
          toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
          return;
        }
      }
      this.editId = null;
      Object.keys(this.form).forEach((k)=>{this.form[k] = null});
    },
    async receivePurchase(){
      try{
        this.$store.dispatch('receiveAmmoPurchase',this.editId);
        toast("Changes Saved!",{type:'success',autoClose:2000});
        this.editing = false;
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
        return;
      }
      this.editId = null;
      Object.keys(this.form).forEach((k)=>{this.form[k] = null});
    },
    async deletePurchase(){
      try{
        this.$store.dispatch('deleteAmmoPurchase',this.editId);
        toast("Changes Saved!",{type:'success',autoClose:2000});
        this.editing = false;
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
        return;
      }
      this.editId = null;
      Object.keys(this.form).forEach((k)=>{this.form[k] = null});
    }
  },
  mounted(){},
  created(){
    if(!this.populateWith.empty){
      this.inPerson = false;
      this.editing = true;
      this.editId = this.populateWith.Id;
      this.form = this.populateWith;
      this.form.DatePurchased = this.populateWith.DatePurchased.split(' ')[0];
    }
  },
  data(){
    return {
      editing:false,
      inPerson:true,
      form:{
        Ammo:null,
        Vendor:null,
        Rounds:null,
        Price:null,
        DatePurchased:null,
        DateReceived:null,
      },
      ammoRules:[
        value => {
          if(value) return true
          return "Ammo is required"
        }
      ],
      vendorRules:[
        value => {
          if(value) return true;
          return "Vendor is required"
        }
      ],
      numberRules:[
        value =>{
          if(value) return true;
          return "Number fields are required"
        }
      ],
      dateRules:[
        value => {
          if(value) return true;
          return "Date fields are required"
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
        <v-select v-model="form.Vendor" :rules="vendorRules" label="Vendor" :items="vendors" item-title="Name" item-value="Id" :disabled="editing"></v-select>
        <v-select v-model="form.Ammo" :rules="ammoRules" label="Ammo" :items="ammo" item-title="Display" item-value="Id" :disabled="editing"></v-select>
        <v-text-field v-model="form.Rounds" label="Rounds" type="number" :rules="numberRules" :disabled="editing"></v-text-field>
        <v-text-field v-model="form.Price" label="Price" type="number" :rules="numberRules" :disabled="editing"></v-text-field>
        <v-text-field v-model="form.DatePurchased" label="Date Purchased" :rules="dateRules" type="date" :disabled="editing"></v-text-field>
        <v-checkbox v-model="inPerson" label="Purchased in-person?" :disabled="editing"></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="!editing" type="submit">Submit</v-btn>
        <v-btn v-if="editing" @click="receivePurchase">Receive</v-btn>
        <v-btn v-if="editing" @click="deletePurchase">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
