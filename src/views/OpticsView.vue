<script setup>

import OpticForm from '../components/OpticForm.vue';
import { useStore } from 'vuex';
import { ref,computed } from 'vue';

const store = useStore();

let optics = computed(()=>{
  return store.state.optics;
});

let newRecord = ref(false);
let editId = ref(null);

const toggleNewForm = () => {
  newRecord.value = !newRecord.value;
}
const setEdit = (id) => {
  editId.value = editId.value == id ? null:id;
}

</script>

<template>
  <v-btn @click="toggleNewForm">New</v-btn>
  <div v-if="newRecord">
    <b>New Optic:</b>
    <OpticForm></OpticForm>
  </div>
  <br>
  <br>
  <hr>
  <v-list>
    <v-list-item v-for="i in optics" :key="i.Id" :title="i.Name" :class="{selected:i.Id == editId}">
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-target</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn color="grey-lighten-1" icon="mdi-pencil" variant="text" @click="() => setEdit(i.Id)"></v-btn>
    </template>
    <div v-if="i.Id == editId">
      <OpticForm :populateWith="i"></OpticForm>
    </div>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.selected{
  color:red;
}
</style>
