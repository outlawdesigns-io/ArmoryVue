import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path:'/home',
      name:'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/vendors',
      name: 'vendors',
      component: () => import('../views/VendorView.vue')
    },
    {
      path: '/manufacturers',
      name: 'manufacturers',
      component: () => import('../views/ManufacturerView.vue')
    },
    {
      path: '/calibers',
      name: 'calibers',
      component: () => import('../views/CaliberView.vue')
    },
    {
      path: '/ammo',
      name: 'ammo',
      component: () => import('../views/AmmoView.vue')
    },
    {
      path: '/firearms',
      name: 'firearms',
      component: () => import('../views/FirearmView.vue')
    },
    {
      path: '/shoots',
      name: 'shoots',
      component: () => import('../views/ShootView.vue')
    }
  ]
})

export default router
