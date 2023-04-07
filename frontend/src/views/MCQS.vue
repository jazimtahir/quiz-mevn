<template>
    <section class="container mx-auto px-4 py-4">
        <div class="text-right">
            <button @click="mcqStore.addModal = true" class="transition ease-in-out delay-100 duration-200 text-black border bg-white border-blue-800 bg-transparent hover:text-white hover:bg-gray-800 hover:border-transparent font-bold py-2 px-2 rounded my-2">Add MCQ</button>
        </div>
        <div class="flex flex-row my-4" v-for="({_id, statement, options}, index) in mcqStore.mcqs">
            <div class="flex-none bg-gray-800 pl-4 pt-4">{{ index + 1 }} .</div>
            <div class="w-full md:w-1/2 px-4 bg-gray-800 p-4">
                <label>{{ statement }}</label>
                <div class="mt-4">
                    <div v-for="(option, key) in options" class="w-full text-gray-300 rounded m-1" >
                        <div class="flex items-center pl-3">
                            {{ key + 1 }}.
                            <p class="text-gray-300 py-2 px-4 break-words">
                                {{ option.option }}
                            </p>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </section>

    <!-- add new modal -->
    <Modal :title="'Add MCQ'" :show="mcqStore.addModal" @close="mcqStore.addModal = !mcqStore.addModal">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="w-full rounded-lg shadow md:mt-0 xl:p-0">
                <div class="p-2 sm:p-8">
                    <label for="statement" class="text-sm font-medium text-white">Statement</label>
                        <input id="statement" type="text" v-model="statement" class="mt-2 mb-4 bg-gray-600 border border-blue-900 text-gray-100 sm:text-sm rounded focus:ring-blue-600 focus:border-blue-700 w-full p-1.5" autocomplete="off" />
                        <div class="grid grid-cols-10">
                            <div class="col-span-9">
                                <label for="option" class="text-sm font-medium text-white">Option</label>
                            </div>
                            <div class="col-span-1">
                                <label for="option" class="text-sm font-medium text-white">Correct</label>
                            </div>
                        </div>
                        <div class="grid grid-cols-10" v-for="(option, index) in options">
                                <div class="col-span-9">
                                    <input type="text" v-model="option.option" class="mt-2 mb-2 bg-gray-600 border border-blue-900 text-gray-100 sm:text-sm rounded focus:ring-blue-600 focus:border-blue-700 w-full p-1.5" autocomplete="off" />
                                </div>
                                <div class="col-span-1">
                                    <input type="checkbox" v-model="option.correct" class="form-checkbox h-6 w-6 text-blue-700 rounded my-3 mx-3" />
                                </div>
                            </div>
                        <button @click="addNewOptionField"
                            class="text-white bg-blue-800 hover:bg-blue-700 focus:outline-none border-transparent focus:border-transparent focus:ring-0 font-thin rounded text-sm px-2 py-1.5 text-center mb-10">
                            Add New Option
                        </button>
                        <div class="flex justify-around">
                            <button
                                @click="mcqStore.addModal = !mcqStore.addModal"
                                class="w-full text-black bg-gray-300 hover:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 m-2">
                                Cancel
                            </button>
                            <button
                                @click="addNew"
                                class="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 m-2">
                                Save
                            </button>
                        </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'
import { useMcqStore } from '@/stores/mcq'
import { useToast } from "vue-toastification"

const mcqStore = useMcqStore()
const toast = useToast()

let statement = ref(null)
let options = ref([
    {
        'option': null,
        'correct': false
    }
])

function addNewOptionField() {
    options.value.push({
        'option': null,
        'correct': false
    })
}

async function addNew() {
    if (!statement.value) return

    let error = 0
    options.value.forEach((option) => {
        if (!option.option) error++
    })

    if (error) return
    
    let body = {
        statement: statement.value,
        options: options.value
    }
    await mcqStore.createMcq(body).then(() => {
        toast.success("MCQ added successfully", {
            timeout: 2000
        })
    }, error => {
        console.log(error)
        toast.danger("Error", {
            timeout: 2000
        })
    })

    statement = null
    options = [{
        'option': null,
        'correct': false
    }]
    mcqStore.addModal = false
}
</script>

<style scoped>
</style>