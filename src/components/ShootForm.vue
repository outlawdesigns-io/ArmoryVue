<script>

import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import TargetImageForm from './TargetImageForm.vue';

export default{
  name:'ShootForm',
  components:{
    TargetImageForm
  },
  props:{},
  computed:{
    firearms(){
      return this.$store.state.firearms.map((f)=>{ f.Display = f.Model + " | " + f.Serial_Number; return f});
    },
    ammo(){
      let manufacturers = this.$store.state.manufacturers;
      let calibers = this.$store.state.calibers;
      return this.$store.state.ammo.filter((a)=>{
        return a.Caliber == this.selectedFirearm.Caliber && a.Rounds > 0
      }).map((a)=>{
        a.ManufacturerObj = manufacturers.filter((m)=>{ return m.Id == a.Manufacturer})[0];
        a.CaliberObj = calibers.filter((c)=>{ return c.Id == a.Caliber})[0];
        a.Display = a.CaliberObj.Label + ' | ' + a.ManufacturerObj.Name + ' | ' + a.Casing + ' (' + a.Rounds + ')';
        return a
      });
    }
  },
  methods:{
    async submit(event){
      const valid = await this.$refs.form.validate();
      if(!valid.valid) return;
      let promise;
      let distanceFt = this.selectedDistance == 'Yards' ? (this.distance * 3):this.distance;
      if(!this.captureImages){
        promise = this.$store.dispatch('addShoot',{FireArm:this.selectedFirearm.Id,Ammo:this.selectedAmmo.Id,Rounds:this.rounds,Distance_Ft:distanceFt});
      }else{
        promise = this.$store.dispatch('addShootWithImages',{FireArm:this.selectedFirearm.Id,Ammo:this.selectedAmmo.Id,Rounds:this.rounds,Distance_Ft:distanceFt});
      }
      try{
        await promise;
        toast("Changes Saved!",{type:'success',autoClose:2000});
        if(this.captureImages){
          let promises = [];
          this.targetImages.forEach((e)=>{
            promises.push(this.$store.dispatch('addTargetImage',e));
          });
          await Promise.all(promises);
          toast("Images Saved!",{type:'success',autoClose:2000});
        }
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
        return;
      }
      this.selectedFirearm = {Id:null,Display:''};
      this.rounds = null;
      this.distance = null;
      this.selectedAmmo = {Id:null,Display:''};
      this.captureImages = null;
      this.targetImages = null;
    }
  },
  mounted(){
  },
  data(){
    return {
      selectedFirearm:{Id:null,Display:''},
      selectedAmmo:{Id:null,Display:''},
      rounds:null,
      distance:null,
      selectedDistance:'Yards',
      captureImages:null,
      targetImages:[],
      roundRules:[
        value => {
          if(value > 0) return true;
          return 'Must shoot a positive number of rounds.'
        }
      ],
      firearmRules:[
        value => {
          if (value.Id !== null) return true;
          return 'Must select a firearm'
        }
      ],
      ammoRules:[
        value => {
          if (value.Id !== null) return true;
          return 'Must select ammunition.'
        }
      ],
      distanceRules:[
        value => {
          if (value > 0) return true;
          return 'Must provide a positive distance.'
        }
      ]
    }
  }
}

</script>

<template>
  <v-form ref="form" validate-on="submit" @submit.prevent="submit">
    <v-card>
      <v-card-title>Shoot</v-card-title>
      <v-card-text>
          <v-select v-model="selectedFirearm" :rules="firearmRules" label="Firearm" :items="firearms" item-title="Display" item-value="Id" return-object></v-select>
          <v-select v-model="selectedAmmo" :rules="ammoRules" label="Ammo" :items="ammo" item-title="Display" item-value="Id" return-object></v-select>
          <v-text-field v-model="rounds" :rules="roundRules" label="Rounds" type="number"></v-text-field>
          <v-text-field v-model="distance" :rules="distanceRules" label="Distance" type="number"></v-text-field>
          <v-select v-model="selectedDistance" label="" :items="['Yards','Feet']"></v-select>
          <v-checkbox v-model="captureImages" label="Capture target image(s)"></v-checkbox>
          <div v-if="captureImages">
            <v-file-input v-model="targetImages" show-size counter multiple label="Select Image(s)"></v-file-input>
          </div>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">Submit</v-btn>
        <v-btn>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
