<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
//const store = useStore()
//const value = computed(()=> store.state.auth_token)

export default{
  data: ()=> ({drawer:null}),
}

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <v-app id="inspire">
     <v-navigation-drawer v-model="drawer">
       <v-list density="compact" nav>
         <v-list-item title="Home" value="home" to="/home"></v-list-item>
         <v-list-item title="Shoots" value="shoots" to="/shoots"></v-list-item>
         <v-list-item title="Manufacturers" value="manufacturers" to="/manufacturers"></v-list-item>
         <v-list-item title="Vendors" value="vendors" to="/vendors"></v-list-item>
         <v-list-item title="Calibers" value="calibers" to="/calibers"></v-list-item>
         <v-list-item title="Firearms" value="firearms" to="/firearms"></v-list-item>
         <v-list-item title="Ammo" value="ammo" to="/ammo"></v-list-item>
       </v-list>
     </v-navigation-drawer>

     <v-app-bar>
       <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

       <v-toolbar-title>Armory</v-toolbar-title>
     </v-app-bar>

     <v-main>
       <RouterView />
     </v-main>
   </v-app>
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
