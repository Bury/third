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

// post /v1/user/list 获取账号列表
global.GET_USER_LIST = `${SERVER_IP}${COMMON}user/list`
// post /v1/user/create 添加账号
global.ADD_USER = `${SERVER_IP}${COMMON}user/create`
// post /v1/user/update/:id 修改账号
global.EDIT_USER = `${SERVER_IP}${COMMON}user/update/`
// post /v1/user/delete/:id 删除账号
global.DELETE_USER = `${SERVER_IP}${COMMON}user/delete/`

// post /v1/role/list 获取角色列表
global.GET_ROLE_LIST = `${SERVER_IP}${COMMON}role/list`
// post /v1/role/create 新增角色
global.ADD_ROLE = `${SERVER_IP}${COMMON}role/create`
// post /v1/role/update/:id 修改角色
global.EDIT_ROLE = `${SERVER_IP}${COMMON}role/update/`
// post /v1/role/update/:id 删除角色
global.DELETE_ROLE = `${SERVER_IP}${COMMON}role/delete/`

// post /v1/loginlog/list 获取登录日志
global.GET_LOGINLOG_LIST = `${SERVER_IP}${COMMON}loginlog/list`

// post /v1/oplog/list 获取操作日志
global.GET_OPLOG_LIST = `${SERVER_IP}${COMMON}oplog/list`