import { addSolution } from '@/api/solution'

const actions = {
  // solution add
  add({ commit }, form) {
    const { name, public_, intros, userId, gateway, sensor } = form
    return new Promise((resolve, reject) => {
      addSolution({ name: name.trim(), public: public_, intros: intros, userId, gateway: gateway, sensor: sensor }).then(response => {
        console.log(response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
