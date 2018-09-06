/**
 * 所有关于人脸识别设备的接口
 */
import axios from 'axios'

export default {
  // 获取货盘列表 按设备
  palletList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 获取货盘列表 按商家
  merchantList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_LIST_MERCHANT, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  //获取门店列表
  storetList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_LIST_MERCHANT_STORE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 导入设备
  importOrder (file) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_IMPORT, file).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 新增设备
  addDevice (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_CREATE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 编辑货盘列表 按设备
  editDevice (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_EDIT, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 获取版本号
  getVersion () {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_VERSION_LIST).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 新增版本号
  addVersion (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_VERSION_ADD, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 删除版本号
  deleVersion (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_DELTE, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}