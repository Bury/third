/**
 * 所有关于设备的接口
 */
import axios from 'axios'

export default {
  //人脸识别设备列表
  faceDeviceList (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_LIST, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  //人脸识别设备列表按商家查看
  faceDeviceMerchant (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_LIST_MERCHANT, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  
   //按商家门店查看
  faceMerchantStore (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_LIST_MERCHANT_STORE, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  
  //新增
  faceDeviceCreate (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_CREATE, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  
  //更新
  faceDeviceUpdate (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_UPDATE, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  
  //版本号列表
  faceDeviceVersion (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_VERSION_LIST, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  
  
  //新增版本号
  faceDeviceVersionAdd (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_VERSION_ADD, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  
  //删除版本号
  faceVersionDele (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_DELTE, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  
  //导入设备
  faceDeviceImport (id) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_FACE_IMPORT, id).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  
}