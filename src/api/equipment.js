/**
 * 所有关于设备的接口
 */
import axios from 'axios'

export default {
  //获取货盘列表
  palletList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_PALLET_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}