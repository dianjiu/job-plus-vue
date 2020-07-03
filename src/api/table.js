import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/task-manage-vue/table/list',
    method: 'get',
    params
  })
}
