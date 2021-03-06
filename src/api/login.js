import request from '@/utils/request'


export function loginByUsername(username, password) {
  const data = {
    username:username,
    password:password
  }
  return request({
    url: '/admin/login',
    method: 'post',
    data,
    encryptedOrNot:true,
  })
}
// export function loginByUsername(username, password) {
//   return request.post('admin/login', {
//     username: username,
//     password: password
//   })
// }
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return token
}

