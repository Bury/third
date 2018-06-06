/**
 * 所有关于设备的接口
 */
import axios from 'axios'

export default {
  //获取货盘列表 按设备
  palletList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_PALLET_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  //获取货盘列表 按商家
  merchantList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_MERCHANT_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  //获取门店列表
  storetList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_STORE_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 导入设备
  importOrder (formData) {
    return new Promise((resolve, reject) => {
      axios.post(global.IMPORT_ORDER, formData, {
        headers: {
          'Content-Type': false
        }
      }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}