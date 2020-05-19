import { add } from '@/api/gateway'

const actions = {
  // gateway add
  add({ commit }, gatewayForm) {
    const { name, description, type, companyId } = gatewayForm
    return new Promise((resolve, reject) => {
      add({ name: name.trim(), description: description, type: type, companyId: companyId }).then(response => {
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

