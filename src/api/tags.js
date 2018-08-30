/**
 * 标签管理的接口
 */
import axios from 'axios'

export default {
  // 登录
  parentList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.TAG_PARENT_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
 childsParentList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.TAG_CHILDS_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  childsEdit (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.TAG_CHILDS_EDIT, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}