import { createStore } from 'vuex'

export default createStore({
  state: {
    mcqs: []
  },
  getters: {
    mcqs: state => {
      return state.mcqs
    }
  },
  mutations: {
    SET_MCQS (state, mcqs) {
      state.mcqs = mcqs
    }
  },
  actions: {
    async getMcqs ( {commit} ) {
      try {
        const response = await this.$http.get('http://jsonplaceholder.typicode.com/posts')
        commit('SET_MCQS', response.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
})