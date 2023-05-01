<script>

import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default{
  name:'TargetImageForm',
  components:{},
  props:{},
  computed:{},
  methods:{
    async submit(event){
      const valid = await this.$refs.form.validate();
      if(!valid.valid) return;
      try{
        //await this.$store.dispatch('addShoot',{FireArm:this.selectedFirearm.Id,Ammo:this.selectedAmmo.Id,Rounds:this.rounds});
        toast("Changes Saved!",{type:'success',autoClose:2000});
      }catch(err){
        toast(err + "\nSee console for details.",{type:'error',autoClose:3000});
        return;
      }
    }
  },
  mounted(){
  },
  data(){
    return {}
  }
}

</script>

<template>
  <v-file-input show-size counter multiple label="Select Image(s)"></v-file-input>
</template>
