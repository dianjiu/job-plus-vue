import req from '@/utils/myreq'
let baseUrl = "/tTaskDetails"
/**
 * 任务信息列表
 * 
 */
export function getTaskList(data) {
  return req.postJson(`${baseUrl}/listByPage`,data)
}

/**
 * 任务信息详情
 * 
 */
export function getTaskInfo(id) {
  return req.postJson(`${baseUrl}/get`,{id})
}
/**
 * 删除任务信息详情
 * 
 */
export function deleteTask(id) {
  return req.get(`${baseUrl}/delete`,{id})
}
/**
 * 添加任务信息详情
 * 
 */
export function insertTask(data) {
  return req.postJson(`${baseUrl}/insert`,data)
}
/**
 * 修改任务状态
 * 
 */
export function optionTask(params) {
  return req.post(`${baseUrl}/optionTask`,params)
}
/**
 * 执行任务
 * 
 */
export function runTask(data) {
  return req.post(`${baseUrl}/runtask`,data)
}
/**
 * 编辑任务
 * 
 */
export function updateTask(data) {
  return req.postJson(`${baseUrl}/update`,data)
}