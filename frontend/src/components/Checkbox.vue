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
    console.log(props.selected)
}
</script>

<template>
    <input @change="update(mcq._id, optionKey)" :checked="selected[mcq._id] === optionKey" :id="`mcq-option-${ mcq._id }-${ optionKey }`" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
    <label :for="`mcq-option-${ mcq._id }-${ optionKey }`" class="w-full py-3 ml-2 text-sm font-medium">{{ option }}</label>
</template>

<style scoped>
</style>