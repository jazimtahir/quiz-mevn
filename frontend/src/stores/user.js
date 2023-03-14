import { defineStore } from "pinia"
import http from '@/api/index'
import router from '@/router'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) ?? null,
        token: localStorage.getItem('token') ?? null
    }),
    getters: {

    },
    actions: {
        async login (username, password) {
            await http.post('/login', {username, password})
            .then((response) => {
                this.token = response.data.token
                http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                localStorage.setItem( 'token', JSON.stringify(this.token) )
                this.session()
                router.push({ name: 'Home' })
            }, error => {
                console.log(error.response.data.message)
            })
        },
        async register (username, email, password) {
            await http.post('/register', {username, email, password})
            .then((response) => {
                this.token = response.data.token
                http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                localStorage.setItem( 'token', JSON.stringify(this.token) )
                this.session()
                router.push({ name: 'Home' })
            }, error => {
                console.log(error.response.data.message)
            })
        },
        async session () {
            await http.get('/session')
            .then((response) => {
                this.user = response.data
                localStorage.setItem( 'user', JSON.stringify(this.user) )
            })
        },
        logout () {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.user = null
            this.token = null
            router.push({ name: 'Login' })
        }
    }
})