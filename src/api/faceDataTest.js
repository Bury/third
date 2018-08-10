import axios from 'axios'
export default {
  // 获取货盘列表 按设备
  faceList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  createANew (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.CREATE_NEW, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  createAUpdate(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.CREATE_NEW_UPDATE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  deleteThis(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELET_THIS, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  deviceLink(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DEVICE_LINK, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  faceGroupList(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_GROUP_LIT, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  delteeFaceLit(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELETE_FEACE_LIT, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  faceSearch(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_SEARCH, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  faceSearchSure(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_SEARCH_SURE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  faceSoult(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_SRLUT, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  faceSoultDetail(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.FACE_SRLUT_DETAIL, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
