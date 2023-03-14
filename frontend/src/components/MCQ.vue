<script setup>
import Checkbox from './Checkbox.vue'
import { onMounted, ref, toRaw } from 'vue'

let selected = ref([])

const props = defineProps({
    mcq: {
        type: Object,
        default: {}
    },
    mcqKey: Number
});
onMounted(() => {
    // selected.value.push({'uame': 'trye'})
    // console.log(selected)
});

function check (mcq) {
    if (!selected.value.length)
        return
    for (const [key, value] of Object.entries(selected.value)) {
        // console.log("MCQ: " + key);
        // console.log("Selected option: " + (parseInt(value) + 1));
        mcq.options.forEach((option, key) => {
            clearHighlight(mcq.id, key)
        })
        let correct = mcq.options.findIndex(option => option.correct)
        if (value === correct) {
            console.log('correct answer')
            highlightSuccess(key, value)
        } else {
            console.log('incorrect')
            highlightDanger(key, value)
        }
    }
}

function highlightDanger(mcqId, selected) {
    let option = document.getElementById(`mcq-${mcqId}-${selected}`)
    option.className = 'w-full border border-red-400 text-red-700 rounded m-1'
}
function highlightSuccess(mcqId, selected) {
    let option = document.getElementById(`mcq-${mcqId}-${selected}`)
    option.className = 'w-full border border-green-400 text-green-700 rounded m-1'
}
function clearHighlight(mcqId, selected) {
    let option = document.getElementById(`mcq-${mcqId}-${selected}`)
    option.className = 'w-full border border-gray-500 text-gray-300 rounded m-1'
}

</script>

<template>
    <div class="flex flex-row">
        <div class="flex-none bg-gray-800 pl-4 pt-4">{{ mcqKey + 1 }} .</div>
        <div class="w-full px-4 bg-gray-800 p-4">
            <label>{{ mcq.statement }}</label>
            <div class="mt-4">
                <div v-for="(option, key) in mcq.options" class="w-full border border-gray-500 text-gray-300 rounded m-1" :id="`mcq-${ mcq.id }-${ key }`" >
                    <div class="flex items-center pl-3">
                        <Checkbox :mcq="mcq" :optionKey="key" :option="option.option" :selected="selected" />
                        <!-- <p class="transition ease-in-out delay-150 duration-300 hover:-translate-y-1 bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white py-2 px-4 border border-gray-800 rounded hover:border-transparent break-words">
                            {{ option }}
                        </p> -->
                    </div>
                </div>
            </div>
            <button class="transition ease-in-out delay-100 duration-200 text-white border bg-blue-700 border-blue-800 bg-transparent hover:text-blue-700 hover:bg-white hover:border-transparent font-bold py-2 px-2 rounded my-1 mx-1"
            @click="check(mcq)"
            >
            Check
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>