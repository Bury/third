import axios from 'axios'
export default {
  // 监控数据
  monitoyingList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  monitoyingCreat (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_CREAT, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  monitoyingDelete (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_DELET, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  monitoyingUpdate (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_UPDATE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  monitoyingTimeList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_TIME_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  monitoyingTimeCreate (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_TIME_CREATE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  monitoyingTimeDelete (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_TIME_DELETE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  monitoyingTimeUpdate (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.MONITORING_TIME_UPDATE, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
