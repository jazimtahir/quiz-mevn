import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        //lazy loading
        component: () => import ('@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import ('@/views/Register.vue')
    },
]

const router = createRouter({
    history: createWebHistory(''),
    routes
})

router.beforeEach((to, from, next) => {
    // const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    // const token = localStorage.getItem('token')

    // if((to.name !== 'Login' && to.name !== 'Register') && token) {
    //     next()
    // }
    // else if (requiresAuth && !token) {
    //     router.push('/login')
    // }
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login' && to.path !== '/register') {
        next({ path: '/login' })
    }
    else if (token && (to.path == '/login' || to.path == '/register')) {
        next({ path: to.path })
    }
    else {
        next()
    }

})

export default router