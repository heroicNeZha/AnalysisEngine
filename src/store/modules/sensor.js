import { addSensor } from '@/api/solution'

const actions = {
  // sensor add
  add({ commit }, gatewayForm) {
    const { model, innerProtocols, uploadProtocals, chargeable, lowVoltage, highVoltage, lowTemprature, highTemprature, desc, otherDesc, industrialGrad, companyId } = gatewayForm
    return new Promise((resolve, reject) => {
      addSensor({ model: model, innerProtocols: innerProtocols, uploadProtocals: uploadProtocals, chargeable, lowVoltage, highVoltage, lowTemprature, highTemprature, desc, otherDesc, industrialGrad, companyId }).then(response => {
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

