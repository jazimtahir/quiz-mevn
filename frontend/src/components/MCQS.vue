<script setup>
import { onMounted } from 'vue'
import { useMcqStore } from '@/stores/mcq'
import MCQ from './MCQ.vue'

const mcqStore = useMcqStore()
// defineProps({
//     mcqs: {
//         type: Object,
//         default: []
//     }
// })
onMounted(() => {
    mcqStore.getMcqs()
})
</script>

<template>
    <div v-for='(mcq, key) in mcqStore.mcqs'>
        <MCQ :mcq="mcq" :mcqKey="key"/>
        <br>
    </div>
</template>
<style scoped>
</style>