<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
        <div
        class="fixed inset-0 bg-gray-600 opacity-75"
        @click.self="closeModal"
        ></div>
        <div class="w-full mx-2 md:w-1/2 md:mx-0 relative bg-gray-800 rounded-lg overflow-hidden">
        <div class="flex justify-between px-4 py-2 border-b">
            <h2 class="font-semibold text-gray-300">{{ title }}</h2>
            <button @click="closeModal" class="text-gray-300 hover:text-gray-100">
            <svg viewBox="0 0 20 20" class="w-6 h-6 fill-current">
                <path
                fill-rule="evenodd"
                d="M12.707,7.293 L10,10 L7.293,7.293 C6.902,6.902 6.268,6.902 5.877,7.293 C5.488,7.683 5.488,8.316 5.877,8.707 L8.584,11.414 L5.877,14.121 C5.488,14.512 5.488,15.145 5.877,15.536 C6.078,15.732 6.341,15.83 6.604,15.83 C6.867,15.83 7.13,15.732 7.331,15.536 L10,12.828 L12.707,15.536 C12.908,15.732 13.171,15.83 13.434,15.83 C13.697,15.83 13.96,15.732 14.161,15.536 C14.55,15.145 14.55,14.512 14.161,14.121 L11.454,11.414 L14.161,8.707 C14.55,8.316 14.55,7.683 14.161,7.293 C13.77,6.902 13.137,6.902 12.707,7.293 Z"
                ></path>
            </svg>
            </button>
        </div>
        <div class="p-4">
            <slot></slot>
        </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineEmits } from 'vue'

const emits = defineEmits(['close'])

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    show: {
        type: Boolean,
        required: true,
        default: false
    }
})

const showModal = ref(props.show)
  
const closeModal = () => {
    showModal.value = false
    emits('close')
}
</script>
  