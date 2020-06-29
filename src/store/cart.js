export default {

  state: {

    cartList: []

  },

  getters: {
    cartList: state => {
      return state.cartList
    }
  },

  actions: {

  },

  mutations: {
    changeCartlist(state, data) {
      state.cartList = data
    }
  }

}
