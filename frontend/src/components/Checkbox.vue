<script setup>
import { onMounted } from 'vue'

const props = defineProps({
    mcq: Object,
    optionKey: Number,
    option: String,
    selected: Array
});

onMounted(() => {
});
function update(id, key) {
    props.selected[id] = key
}
</script>

<template>
    <input @click="update(mcq.id, optionKey)" @change="update(mcq.id, optionKey)" :checked="selected[mcq.id] === optionKey" :id="`mcq-option-${ mcq.id }-${ optionKey }`" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
    <label :for="`mcq-option-${ mcq.id }-${ optionKey }`" class="w-full py-3 ml-2 text-sm font-medium">{{ option }}</label>
</template>

<style scoped>
</style>