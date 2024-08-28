<script setup>

import { useStore } from 'vuex';
import { ref,computed } from 'vue';

const store = useStore();
const props = defineProps({populateWith:{
      type:Object,
      default: ()=>({empty:true})
    }
  }
);

let shootDetails = computed(()=>{
  return {
    Id:props.populateWith.Id,
    rounds:props.populateWith.Rounds,
    range:props.populateWith.Distance_Ft,
    ammo:store.state.ammo.filter((e)=>{
      return e.Id == props.populateWith.Ammo;
    }).map((e)=>{
      e.ManufacturerObj = store.state.manufacturers.filter((m)=>{ return m.Id == e.Manufacturer; })[0];
      e.CaliberObj = store.state.calibers.filter((c)=>{ return c.Id == e.Caliber})[0];
      return e;
    })[0],
    firearm:store.state.firearms.filter((e)=>{
      return e.Id == props.populateWith.FireArm;
    }).map((e)=>{
      e.ManufacturerObj = store.state.manufacturers.filter((m)=>{ return m.Id == e.Manufacturer; })[0];
      return e;
    })[0],
    optic: props.populateWith.Optic ? store.state.optics.filter((o)=>{ return o.Id == props.populateWith.Optic })[0]:null
  }
});

</script>

<template>
  <v-card>
    <v-card-title>{{shootDetails.firearm.ManufacturerObj.Name}}, {{shootDetails.firearm.Model}}, {{shootDetails.firearm.Serial_Number}}</v-card-title>
    <v-card-text>
      <v-table>
        <tr>
          <td colspan="4" class="tableHeader">Shoot</td>
        </tr>
        <tr>
          <td>Rounds:</td>
          <td>{{shootDetails.rounds}}</td>
          <td>Distance (ft.): </td>
          <td>{{shootDetails.range}}</td>
        </tr>
        <tr v-if="shootDetails.optic">
          <td colspan="4" class="tableHeader">Optic</td>
        </tr>
        <tr v-if="shootDetails.optic">
          <td>Name:</td>
          <td>
            <a v-bind:href="shootDetails.optic.LinkToProduct" target="_blank">{{shootDetails.optic.Name}}</a>
          </td>
          <td>Magnification:</td>
          <td>{{shootDetails.optic.MagnificationTimes}}x</td>
        </tr>
        <tr>
          <td colspan="4" class="tableHeader">{{shootDetails.ammo.ManufacturerObj.Name}}</td>
        </tr>
        <tr>
          <td>Type:</td>
          <td>{{shootDetails.ammo.BulletType}}</td>
          <td>Casing:</td>
          <td>{{shootDetails.ammo.Casing}}</td>
        </tr>
        <tr>
          <td>Bullet Weight:</td>
          <td>{{shootDetails.ammo.BulletWeight}} gr.</td>
          <td>Muzzle Velocity:</td>
          <td>{{shootDetails.ammo.MuzzleVelocity}} FPS</td>
        </tr>
      </v-table>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<style>
.tableHeader{
  text-align:center;
  background-color: #bec2bf;
}
</style>
