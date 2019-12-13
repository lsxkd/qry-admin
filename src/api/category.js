import request from '@/utils/request'

// 分类列表
export function categoryList(data) { //分类列表
  return request({
      url: 'category/page',
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