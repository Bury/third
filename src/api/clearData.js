import axios from 'axios'

export default{
  //门店列表
  storeList(list){
    return new Promise((resolve, reject) => {
      axios.post(global.CLEAR_STORE_LIST,list).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  },
  //商家列表
  merchantList(list){
    return new Promise((resolve, reject) => {
      axios.post(global.CLEAR_MERCHANT_LIST,list).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  },
  //门店列表清除数据
  storeListClear(list){
    return new Promise((resolve, reject) => {
      axios.post(global.CLEAR_STORE_LISTDATA,list).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  },
  //商家列表清除数据
  merchantListClear(list){
    return new Promise((resolve, reject) => {
      axios.post(global.CLEAR_MERCHANT_LISTDATA,list).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
}
