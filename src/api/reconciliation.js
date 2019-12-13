import request from '@/utils/request'

//对账列表
export function billReport(query) {
  return request({
    url: '/mg-back/report/billReport',
    method: 'get',
    params: query
  })
}
//对账明细
export function balancelog(query) {
  return request({
    url: '/mg-back/user/balancelog',
    method: 'get',
    params: query
  })
}
