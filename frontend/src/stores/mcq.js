import { defineStore } from "pinia"
import http from '@/api/index'

export const useMcqStore = defineStore('mcq', {
    state: () => ({
        mcqs: []
    }),
    getters: {
        
    },
    actions: {
      async getMcqs () {
        await http.get('/mcq').then((response) => {
          this.mcqs = response.data
        }, error => {
          console.log(error)
        })
      }
    }
})