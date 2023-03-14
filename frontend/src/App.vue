<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import MCQS from './components/MCQS.vue'
import VueWhiteboard from '@beauagst/vue-whiteboard'

const whiteboard = ref(null)
const showDrawBoard = ref(false)

const wbBgColor = ref('#000000')
const wbColor = ref('#ffffff')

async function clearWhiteBoard() {
  const res = await whiteboard.value.clear()
}
async function saveWhiteBoard() {
  const res = await whiteboard.value.save()
}

function changeWbTheme () {
  if (wbBgColor.value == '#000000') {
    wbBgColor.value = wbColor.value
    wbColor.value = '#000000'
  }
  else if (wbBgColor.value == '#ffffff') {
    wbBgColor.value = wbColor.value
    wbColor.value = '#ffffff'
  }
}

let mcqs = ref([
  {
    'id': 1,
    'statement': 'Which of the following keywords is used to define a variable in Javascript?',
    'options': [
      {
        'option': 'var',
        'correct': false
      },
      {
        'option': 'let',
        'correct': false
      },
      {
        'option': 'Both A & B',
        'correct': true
      },
      {
        'option': 'None',
        'correct': false
      },
    ],
  },
  {
    'id': 2,
    'statement': 'Which function is used to serialize an object into a JSON string in Javascript?',
    'options': [
      {
        'option': 'stringify()',
        'correct': true
      },
      {
        'option': 'parse()',
        'correct': false
      },
      {
        'option': 'convert()',
        'correct': false
      },
      {
        'option': 'None of the above',
        'correct': false
      },
    ],
  }
])
</script>

<template>
  <Header />
  <main class="container mx-auto px-4 py-4">
    <div class="flex flex-row">
  {{ $store.getters.fullName }}
      <div class="flex-1">
        <MCQS :mcqs="mcqs" />
      </div>
      <div class="flex-1 hidden lg:block ml-8 relative">
        <div class="fixed">
          <!-- <button @click="saveWhiteBoard" class="transition ease-in-out delay-100 duration-200 text-black border bg-white border-blue-800 bg-transparent hover:text-gray-800 hover:bg-white hover:border-transparent font-bold py-2 px-2 rounded my-1 mx-2">Save White Board</button> -->
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Draw your thoughts</label>
          <div v-if="!showDrawBoard">
            <textarea id="message" rows="30" cols="100" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          </div>
          <div v-else>
            <vue-whiteboard height="600px" width="600px" ref="whiteboard" :backgroundColor="wbBgColor" :color="wbColor"/>
          </div>
          <button @click="clearWhiteBoard" class="transition ease-in-out delay-100 duration-200 text-black border bg-white border-blue-800 bg-transparent hover:text-white hover:bg-gray-800 hover:border-transparent font-bold py-2 px-2 rounded my-2">Clear White Board</button>
          <button @click="changeWbTheme" class="transition ease-in-out delay-100 duration-200 text-black border bg-white border-blue-800 bg-transparent hover:text-white hover:bg-gray-800 hover:border-transparent font-bold py-2 px-2 rounded my-2 mx-1">Change Theme</button>
          <button @click="showDrawBoard = !showDrawBoard" class="transition ease-in-out delay-100 duration-200 text-black border bg-white border-blue-800 bg-transparent hover:text-white hover:bg-gray-800 hover:border-transparent font-bold py-2 px-2 rounded my-2 mx-1">Change Board Type</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
