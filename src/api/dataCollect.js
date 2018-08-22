import axios from 'axios'
export default {
  dataSettingSave(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SETTING_SAVE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  dataSettingSaveBack(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SETTING_SAVE_BACK, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  dataListFace(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DATA_LIST_B, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getDepartList(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MSD_LINKAGE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  takeErrorMark(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.TAKE_MARK, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  needMergeData(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.NEED_MERGE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  sureMerge(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.SURE_MERGE_F, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  mergeDetail(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MERGE_DETAIL, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  outMerge(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.OUT_MERGE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  deletFasce(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.DELET_FSCE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  customerRecord(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.CUSTOMER_RECORE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getBaiduFace(list) {
    return new Promise((resolve, reject) => {
      axios.post(global.BAIDU_FACE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
