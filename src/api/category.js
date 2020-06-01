import request from '@/utils/request'

// 分类列表
export function categoryList(data) { //分类列表
  return request({
      url: 'category/page',
      method: 'post',
      data
  })
}

// 上传图片
export function fileUpload(data) { //上传图片
  return request({
      url: 'fileUpload',
      method: 'post',
      data
  })
}

// 添加分类
export function addCategory(data) { //添加分类
  return request({
      url: 'category/save',
      method: 'post',
      data
  })
}

// 分类删除
export function delCategory(data) { //分类删除
  return request({
      url: 'category/delete',
      method: 'get',
      params: data
  })
}



// 充值套餐列表
export function coincomposeList(data) { //分类列表
  return request({
      url: 'coincompose/page',
      method: 'post',
      data
  })
}

// 添加充值套餐
export function addCoincompose(data) { //添加分类
  return request({
      url: 'coincompose/save',
      method: 'post',
      data
  })
}

// 充值套餐删除
export function delCoincompose(data) { //分类删除
  return request({
      url: 'coincompose/delete',
      method: 'get',
      params: data
  })
}


// 订单列表
export function orderCoinList(data) { //添加分类
  return request({
      url: 'order/coin/page',
      method: 'post',
      data
  })
}

// 开通会员订单列表
export function orderVipList(data) { //分类删除
  return request({
      url: 'order/vip/page',
      method: 'post',
      data
  })
}


// 免广告业务分页查询
export function orderCoinNoadvertPage(data) { //免广告业务分页查询
  return request({
      url: 'order/coin/noadvert/page',
      method: 'post',
      data
  })
}



// 标签列表
export function tagList(data) { //标签列表
  return request({
      url: 'tag/page',
      method: 'post',
      data
  })
}

// 添加标签
export function addTag(data) { //添加标签
  return request({
      url: 'tag/save',
      method: 'post',
      data
  })
}

// 标签删除
export function delTag(data) { //标签删除
  return request({
      url: 'tag/delete',
      method: 'get',
      params: data
  })
}


// VIP套餐列表
export function vipComposeList(data) { //VIP套餐列表
  return request({
      url: 'vipcompose/page',
      method: 'post',
      data
  })
}

// 添加VIP套餐
export function addVipCompose(data) { //添加VIP套餐
  return request({
      url: 'vipcompose/save',
      method: 'post',
      data
  })
}

//  VIP套餐删除
export function delVipCompose(data) { //VIP套餐删除
  return request({
      url: 'vipcompose/delete',
      method: 'get',
      params: data
  })
}

// 小说分页查询
export function managerBookPage(data) { //小说分页查询
  return request({
      url: '/manager/book/page',
      method: 'post',
      data
  })
}

// 保存和更新小说
export function managerBookSave(data) { //保存和更新小说
  return request({
      url: '/manager/book/save',
      method: 'post',
      data
  })
}

//  删除小说
export function managerBookDelete(data) { //删除小说
  return request({
      url: '/manager/book/delete',
      method: 'get',
      params: data
  })
}

//  清除书本封面
export function managerBookClearCoverImg(data) { //清除书本封面
  return request({
      url: '/manager/book/clear/coverImg',
      method: 'get',
      params: data
  })
}

//  设置VIP
export function managerBookVipSetting(data) { //设置VIP
  return request({
      url: '/manager/book/vip/setting',
      method: 'get',
      params: data
  })
}

//  获取小说全部章节列表
export function bookContentList(data) { 
  return request({
      url: '/manager/book/content/page',
      method: 'post',
      data
  })
}

//  获取小说章节内容
export function managerBookContent(data) { //获取小说章节内容
  return request({
      url: '/manager/book/content',
      method: 'get',
      params: data
  })
}

//  增加或修改章节内容
export function managerBookContentSave(data) { //增加或修改章节内容
  return request({
      url: '/manager/book/content/save',
      method: 'post',
      data
  })
}

//  删除章节
export function managerBookContentDelete(data) { //删除章节
  return request({
      url: '/manager/book/content/delete',
      method: 'get',
      params: data
  })
}

//  Banner分页查询
export function topicBannerPage(data) { //Banner分页查询
  return request({
      url: '/topic/banner/page',
      method: 'post',
      data
  })
}

//  新增及修改Banner
export function topicBannerSave(data) { //新增及修改Banner
  return request({
      url: '/topic/banner/saveOrUpdate',
      method: 'post',
      data
  })
}

//  删除Banner
export function topicBannerDelete(data) { //删除Banner
  return request({
      url: '/topic/banner/delete',
      method: 'get',
      params: data
  })
}

//  栏目树所有节点
export function topicAllTree(data) { //栏目树所有节点
  return request({
      url: '/topic/allTree',
      method: 'get',
      params: data
  })
}

//  栏目顶级
export function topicParent(data) { //栏目顶级
  return request({
      url: '/topic/parent',
      method: 'post',
      data
  })
}

//  新增栏目管理
export function topicSaveOrUpdate(data) { //新增栏目管理
  return request({
      url: '/topic/saveOrUpdate',
      method: 'post',
      data
  })
}

//  二级顶级
export function topicChild(data) { //二级顶级
  return request({
      url: '/topic/child',
      method: 'get',
      params: data
  })
}

//删除栏目
export function topicDelete(data) { //删除栏目
  return request({
      url: '/topic/delete',
      method: 'get',
      params: data
  })
}

//  TopicBook分页查询
export function topicBookList(data) { //TopicBook分页查询
  return request({
      url: '/topic/book/page',
      method: 'post',
      data
  })
}

//TopicBook不分页查询
export function topicBookPage(data) { //TopicBook不分页查询
  return request({
      url: '/topic/book/list',
      method: 'get',
      params: data
  })
}

//  新增TopicBook
export function topicBookSaveOrUpdate(data) { //新增TopicBook
  return request({
      url: '/topic/book/saveOrUpdate',
      method: 'post',
      data
  })
}

//  批量保存书本
export function topicBookSaveBacth(data) { //批量保存书本
  return request({
      url: '/topic/book/saveBacth',
      method: 'post',
      data
  })
}

//  删除全部书本
export function topicBookDeleteAll(data) { //删除全部书本
  return request({
      url: '/topic/book/delete/all',
      method: 'get',
      params: data
  })
}






//  分类启用,禁用
export function dictClassifyEnable(data) { 
  return request({
      url: '/dict/classify/enable',
      method: 'get',
      params: data
  })
}

//  小说大分类值列表
export function dictClassifyList(data) { 
  return request({
      url: '/dict/classify/list',
      method: 'get',
      params: data
  })
}

//  保存和更新子字典
export function dictClassifySaveOrUpdate(data) { 
  return request({
      url: '/dict/classify/saveOrUpdate',
      method: 'post',
      data
  })
}

//  分类删除
export function dictDelete(data) { 
  return request({
      url: '/dict/delete',
      method: 'get',
      params: data
  })
}


//  子分类分页查询
export function classificationCategoryPage(data) { 
  return request({
      url: '/classification/category/page',
      method: 'post',
      data
  })
}
//  批量添加大分类的子分类
export function classificationCategoryBatchSave(data) { 
  return request({
      url: '/classification/category/batch/save',
      method: 'post',
      data
  })
}

//  获取配置信息
export function coinConfigureGet(data) { 
  return request({
      url: '/coin/configure/get',
      method: 'get',
      params: data
  })
}
//  修改配置信息
export function coinConfigureUpdate(data) { 
  return request({
      url: '/coin/configure/update',
      method: 'post',
      data,
      encryptedOrNot:true,
  })
}

//  获取图片根路径
export function getHostPath(data) { 
  return request({
      url: '/getHostPath',
      method: 'get',
      params: data
  })
}


//  处理反馈
export function feedbackAudit(data) { 
  return request({
      url: '/feedback/audit',
      method: 'get',
      params: data
  })
}
//  删除反馈
export function feedbackDelete(data) { 
  return request({
      url: '/feedback/delete',
      method: 'get',
      params: data
  })
}
//  反馈分页
export function feedbackPage(data) { 
  return request({
      url: '/feedback/page',
      method: 'post',
      data
  })
}
//  添加反馈
export function feedbackAdd(data) { 
  return request({
      url: '/feedback/add',
      method: 'post',
      data
  })
}



//  处理反馈
export function feedbackBookAudit(data) { 
  return request({
      url: '/feedback/book/audit',
      method: 'get',
      params: data
  })
}
//  删除反馈
export function feedbackBookDelete(data) { 
  return request({
      url: '/feedback/book/delete',
      method: 'get',
      params: data
  })
}
//  反馈分页
export function feedbackBookPage(data) { 
  return request({
      url: '/feedback/book/page',
      method: 'post',
      data
  })
}
//  添加反馈
export function feedbackBookAdd(data) { 
  return request({
      url: '/feedback/book/add',
      method: 'post',
      data
  })
}





//  修改活动状态
export function activityChangestate(data) { 
  return request({
      url: '/activity/changestate',
      method: 'get',
      params: data
  })
}
//  删除活动
export function activityDelete(data) { 
  return request({
      url: '/activity/delete',
      method: 'get',
      params: data
  })
}
// 活动分页
export function activityPage(data) { 
  return request({
      url: '/activity/page',
      method: 'post',
      data
  })
}
// 添加或修改活动
export function activitySaveOrUpdate(data) { 
  return request({
      url: '/activity/saveOrUpdate',
      method: 'post',
      data
  })
}

// 活动配置分页
export function activityConfigPage(data) { 
  return request({
      url: '/activity/config/page',
      method: 'post',
      data
  })
}
//  删除显示活动
export function activityConfigDelete(data) { 
  return request({
      url: '/activity/config/delete',
      method: 'get',
      params: data
  })
}
// 添加或修改活动显示配置
export function activityConfigSaveOrUpdate(data) { 
  return request({
      url: '/activity/config/saveOrUpdate',
      method: 'post',
      data
  })
}



// 公告分页
export function noticePage(data) { 
  return request({
      url: '/notice/page',
      method: 'post',
      data
  })
}
// 添加或修改公告
export function noticeSaveOrUpdate(data) { 
  return request({
      url: '/notice/saveOrUpdate',
      method: 'post',
      data
  })
}
//  修改公告状态
export function noticeUpdateState(data) { 
  return request({
      url: '/notice/update/state',
      method: 'get',
      params: data
  })
}
//  删除公告
export function noticeDelete(data) { 
  return request({
      url: '/notice/delete',
      method: 'get',
      params: data
  })
}

//  获取VIP开关值
export function managerBookVipGet(data) { 
  return request({
      url: '/manager/book/vip/get',
      method: 'get',
      params: data
  })
}
//  VIP开关
export function managerBookVipEnable(data) { 
  return request({
      url: '/manager/book/vip/enable',
      method: 'get',
      params: data
  })
}







