import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Fuzzy from './components/Fuzzy.vue'
import Six from './components/Six.vue'
import Nine from './components/Nine.vue'
import Twelve from './components/Twelve.vue'

const routes = createRouter({
    history: createWebHistory(),
    routes: [
        // { path: '/', component: Fuzzy, name: 'home' },
        { path: '/', component: Home, name: 'home' },
        { path: '/six', component: Six, name: 'six' },
        { path: '/nine', component: Nine, name: 'nine' },
        { path: '/twelve', component: Twelve, name: 'twelve' },
    ]
})

export default routes