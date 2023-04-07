<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-gray-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 sm:p-8">
                    <h1 class="text-center mb-4 text-2xl text-white md:text-5xl lg:text-4xl">Login</h1>
                    <form class="" @submit.prevent="login">
                        <label for="username" class="text-sm font-medium text-white">Username</label>
                        <input id="username" type="text" v-model="username" class="mt-2 mb-4 bg-gray-600 border border-blue-900 text-gray-100 sm:text-sm rounded focus:ring-blue-600 focus:border-blue-700 w-full p-1.5" autocomplete="off" />
                        <label for="password" class="text-sm font-medium text-white">Password</label>
                        <input id="password" type="password" v-model="password" class="mt-2 mb-10 bg-gray-600 border border-blue-900 text-gray-100 sm:text-sm rounded focus:ring-blue-600 focus:border-blue-700 w-full p-1.5" autocomplete="off" />
                        <button type="submit"
                            class="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 text-center">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const username = ref('')
const password = ref('')

const login = () => {
    if (!username.value || !password.value) {
        return
    }
    userStore.login(username.value, password.value)
}
</script>

<style scoped>
</style>