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


// APP版本分页查询
export function getVersionInfoList(data) { //APP版本分页查询
  return request({
      url: '/appversion/page',
      method: 'post',
      data
  })
}
// 查询最新版本号
export function getLatestVersion(data) { //查询最新版本号
  return request({
    url: '/appversion/latestVersion',
    method: 'get',
    params: data
  })
}
// 查询最新版本号
export function saveOrUpdateVersionInfo(data) { //查询最新版本号
  return request({
      url: '/appversion/saveOrUpdate',
      method: 'post',
      data
  })
}

// 申请上架小说管理
export function applyBookPage(data) { 
  return request({
      url: '/apply/book/page',
      method: 'post',
      data
  })
}
// 申请上架小说管理  处理申请
export function applyBookAudit(data) { 
  return request({
    url: '/apply/book/audit',
    method: 'get',
    params: data
  })
}

// 申请上架小说管理  删除申请
export function applyBookDelete(data) { 
  return request({
    url: '/apply/book/delete',
    method: 'get',
    params: data
  })
}


// APP用户分页查询
export function managerAppuserList(data) { 
  return request({
      url: '/manager/appuser/page',
      method: 'post',
      data
  })
}

// 禁用/启用用户
export function managerAppuserUpdateStatus(data) { 
  return request({
    url: '/manager/appuser/update/status',
    method: 'get',
    params: data
  })
}

