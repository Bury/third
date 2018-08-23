/**
 * 定义所有的常量
 */
// 接口地址
// const SERVER_IP = 'http://test.cc_api.ibetwo.com/'
const SERVER_IP = 'http://dev-api.cc.ibetwo.com/'
const COMMON = 'v1/'

// post /v1/user/access-token 登录
global.GET_LOGIN = `${SERVER_IP}${COMMON}user/access-token`

// post /v1/merchant/list 获取商家列表
global.GET_BUSINESS_LIST = `${SERVER_IP}${COMMON}merchant/list`
// post /v1/merchant/create 新增商家
global.ADD_BUSINESS = `${SERVER_IP}${COMMON}merchant/create`
// post /v1/merchant/update/:id 修改商家
global.EDIT_BUSINESS = `${SERVER_IP}${COMMON}merchant/update/`
// post /v1/merchant/delete/:id 删除商家
global.DELETE_BUSINESS = `${SERVER_IP}${COMMON}merchant/delete/`
// post /v1/merchant-account/create 设置账号
global.SET_BUSINESS_ACCOUNT = `${SERVER_IP}${COMMON}merchant-account/create`
// post /v1/merchant-subsystem/list 获取商家模块
global.SET_BUSINESS_SUBSYSTEM = `${SERVER_IP}${COMMON}merchant-subsystem/list`
// post /v1/merchant-subsystem/update-days 增加天数
global.ADD_DAYS = `${SERVER_IP}${COMMON}merchant-subsystem/update-days`
// post /v1/merchant-subsystem/update-status 更改状态
global.SET_STATUS = `${SERVER_IP}${COMMON}merchant-subsystem/update-status`

// post /v1/device-pallet/list 货盘列表
global.GET_PALLET_LIST = `${SERVER_IP}${COMMON}device-pallet/list`
// post /v1/device-pallet/list-by-merchant 按商家查看
global.GET_MERCHANT_LIST = `${SERVER_IP}${COMMON}device-pallet/list-by-merchant`
// post /v1/device-pallet/list-by-merchant-store 获取门店列表
global.GET_STORE_LIST = `${SERVER_IP}${COMMON}device-pallet/list-by-merchant-store`
// post /v1/device-pallet/import 导入设备
global.IMPORT_ORDER = `${SERVER_IP}${COMMON}device-pallet/import`
// post /v1/device-pallet/create 新增设备
global.ADD_DEVICE = `${SERVER_IP}${COMMON}device-pallet/create`
// post /v1/device-pallet/update/:id 编辑设备
global.EDIT_DEVICE = `${SERVER_IP}${COMMON}device-pallet/update/`
// post /v1/device-pallet/version-list 获取版本号列表
global.GET_DEVICE = `${SERVER_IP}${COMMON}device-pallet/version-list`
// post /v1/device-pallet/version-add 新增版本号
global.ADD_VERSION = `${SERVER_IP}${COMMON}device-pallet/version-add`
// post /v1/device-pallet/version-delete 删除版本号
global.DELETE_VERSION = `${SERVER_IP}${COMMON}device-pallet/version-delete`


//人脸识别设备
//按门店列表
global.FACE_LIST = `${SERVER_IP}${COMMON}device-face/list`
//按商家查看
global.FACE_LIST_MERCHANT = `${SERVER_IP}${COMMON}device-face/list-by-merchant`
//新增
global.DEVICE_FACE_CREATE = `${SERVER_IP}${COMMON}device-face/create`
global.DEVICE_FACE_UPDATE = `${SERVER_IP}${COMMON}device-face/update`
global.DEVICE_FACE_VERSION_LIST = `${SERVER_IP}${COMMON}device-face/version-list`
global.DEVICE_FACE_VERSION_ADD = `${SERVER_IP}${COMMON}device-face/version-add`
global.DEVICE_FACE_DELTE = `${SERVER_IP}${COMMON}device-face/version-delte`
global.DEVICE_FACE_IMPORT = `${SERVER_IP}${COMMON}device-face/import`
global.FACE_LIST_MERCHANT_STORE = `${SERVER_IP}${COMMON}device-face/list-by-merchant-store`


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

//人脸识别分组
global.FACE_LIST = `${SERVER_IP}${COMMON}test-group/list`
//新增
global.CREATE_NEW = `${SERVER_IP}${COMMON}test-group/create`
//编辑
global.CREATE_NEW_UPDATE = `${SERVER_IP}${COMMON}test-group/update`
//删除
global.DELET_THIS = `${SERVER_IP}${COMMON}test-group/delete`
//选取设备下拉
global.LINK_EQUIPMENT = `${SERVER_IP}${COMMON}test-device/link-list`
//设备接入
global.DEVICE_LINK_IN = `${SERVER_IP}${COMMON}test-group/link-in`
//设备断开
global.DEVICE_LINK_OUT = `${SERVER_IP}${COMMON}test-group/link-out`

//人脸样本
global.FACE_GROUP_LIT = `${SERVER_IP}${COMMON}test-face/list`
//删除
global.DELETE_FEACE_LIT = `${SERVER_IP}${COMMON}test-face/delete`
//查找下拉
global.FACE_SEARCH = `${SERVER_IP}${COMMON}test-group/select`
//查询下拉选取确认
global.FACE_SEARCH_SURE = `${SERVER_IP}${COMMON}test-face/search`

//人脸查找结果
global.FACE_SRLUT = `${SERVER_IP}${COMMON}test-search/list`
//详情
global.FACE_SRLUT_DETAIL = `${SERVER_IP}${COMMON}test-search/detail`

//鹰眼数据/基准设置
global.SETTING_SAVE = `${SERVER_IP}hawkeye/datum/save`
//基准数据返回
global.SETTING_SAVE_BACK = `${SERVER_IP}hawkeye/datum/detail`
//数据列表
global.DATA_LIST_B = `${SERVER_IP}hawkeye/face/list`
//门店，位置下拉
global.MSD_LINKAGE = `${SERVER_IP}hawkeye/face/msd-linkage`
//标记错误
global.TAKE_MARK = `${SERVER_IP}hawkeye/face/error-mark`
//查看合并记录
global.MERGE_DETAIL = `${SERVER_IP}hawkeye/face/merge-detail`
//移出合并
global.OUT_MERGE = `${SERVER_IP}hawkeye/face/out-merge`
//删除人脸图
global.DELET_FSCE = `${SERVER_IP}hawkeye/face/delete`
//查看到店记录
global.CUSTOMER_RECORE = `${SERVER_IP}hawkeye/face/customer-recore`
//查看百度人脸图
global.BAIDU_FACE = `${SERVER_IP}hawkeye/face/baidu-recore`
//统计
global.DATA_TJ = `${SERVER_IP}hawkeye/face/data-tj`

//要合并的数据列表
global.NEED_MERGE = `${SERVER_IP}hawkeye/face/show-faces`
//确认合并
global.SURE_MERGE_F = `${SERVER_IP}hawkeye/face/pic-merge`

