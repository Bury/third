/**
 * 定义所有的常量
 */
// 接口地址
const SERVER_IP = 'http://test.cc_api.ibetwo.com/'
const COMMON = 'v1/'

// post /v1/merchant/list 获取商家列表
global.GET_BUSINESS_LIST = `${SERVER_IP}${COMMON}merchant/list`
// post /v1/merchant/create 新增商家
global.ADD_BUSINESS = `${SERVER_IP}${COMMON}merchant/create`
// post /v1/merchant/update/:id 修改商家
global.EDIT_BUSINESS = `${SERVER_IP}${COMMON}merchant/update/`
// post /v1/merchant/delete/:id 删除商家
global.DELETE_BUSINESS = `${SERVER_IP}${COMMON}merchant/delete/`

// post /v1/device-pallet/list 货盘列表
global.GET_PALLET_LIST = `${SERVER_IP}${COMMON}device-pallet/list`