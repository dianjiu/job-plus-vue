import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/task-manage-vue/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/task-manage-vue/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/task-manage-vue/user/logout',
    method: 'post'
  })
}
