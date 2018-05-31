/**
 * 所有关于商家的接口
 */
import axios from 'axios'

export default {
	//获取商家列表
  businessList (list) {
    return new Promise((resolve, reject) => {
      axios.post(global.GET_BUSINESS_LIST, list).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
	//新增商家
	addBusiness (form) {
    return new Promise((resolve, reject) => {
      axios.post(global.ADD_BUSINESS, form).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
	//修改商家
	editBusiness (form, id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.EDIT_BUSINESS}${id}`, form).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
	//删除商家
	deleBusiness (id) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.DELETE_BUSINESS}${id}`).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}