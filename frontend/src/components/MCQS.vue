<script setup>
import MCQ from './MCQ.vue'
defineProps({
    mcqs: {
        type: Object,
        default: []
    }
})
</script>

<template>
    <div v-for='(mcq, key) in mcqs'>
        <MCQ :mcq="mcq" :mcqKey="key"/>
        <br>
    </div>
</template>
<style scoped>
</style>