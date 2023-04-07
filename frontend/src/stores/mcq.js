import { defineStore } from "pinia"
import http from '@/api/index'

export const useMcqStore = defineStore('mcq', {
    state: () => ({
        mcqs: JSON.parse(localStorage.getItem('mcqs')) ?? [],
        addModal: false,
        editModal: false,
        deleteModal: false,
    }),
    getters: {
        
    },
    actions: {
      async getMcqs () {
        await http.get('/mcqs').then((response) => {
          this.mcqs = response.data
          localStorage.setItem('mcqs', JSON.stringify(this.mcqs))
        }, error => {
          console.log(error)
        })
      },

      async createMcq (payload) {
        await http.post('/mcqs', payload).then((response) => {
          this.getMcqs()
        }, error => {
          console.log(error)
        })
      }
    }
})