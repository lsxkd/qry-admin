import request from '@/utils/request'

// 管理员列表
export function managersList(data) { //管理员列表
  return request({
      url: 'admin/page',
      method: 'post',
      data
  })
}

// 添加管理员
export function addManagers(data) { //添加管理员
  return request({
      url: 'admin/save',
      method: 'post',
      data
  })
}

// 删除管理员
export function delManagers(data) { //删除管理员
  return request({
      url: 'admin/delete',
      method: 'get',
      params: data
  })
}
