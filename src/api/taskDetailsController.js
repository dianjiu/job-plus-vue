import request from '@/utils/request'
let baseUrl = "/tTaskDetails"
/**
 * 任务信息列表
 * 
 */
export function getTaskList(data) {
  return request({
    url: `${baseUrl}/list`,
    method: 'post',
    data
  })
}
/**
 * 任务信息详情
 * 
 */
export function getTaskInfo(id) {
  return request({
    url: `${baseUrl}/get/${id}`,
    method: 'get',
  })
}
/**
 * 删除任务信息详情
 * 
 */
export function deleteTask(id) {
  return request({
    url: `${baseUrl}/delete/${id}`,
    method: 'get',
  })
}
/**
 * 添加任务信息详情
 * 
 */
export function insertTask(data) {
  return request({
    url: `${baseUrl}/insert`,
    method: 'post',
    data
  })
}
/**
 * 修改任务状态
 * 
 */
export function optionTask(params) {
  return request({
    url: `${baseUrl}/optionTask`,
    method: 'get',
    params
  })
}
/**
 * 执行任务
 * 
 */
export function runTask(data) {
  return request({
    url: `${baseUrl}/runtask`,
    method: 'post',
    data
  })
}
/**
 * 编辑任务
 * 
 */
export function updateTask(data) {
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data
  })
}