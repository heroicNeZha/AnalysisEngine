import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import gateway from './modules/gateway'
import solution from './modules/solution'
import cart from './cart.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    gateway,
    solution,
    cart
  },
  getters
})

export default store
