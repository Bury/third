/**
 * 所有关于登录的接口
 */
import axios from 'axios'

export default {
  // 登录
  login (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_LOGIN, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 左侧菜单
  menu (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_MENU, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
}
