import request from './request'
import qs from 'qs'

// --------user---start-----------

//获取用户列表
export function getSysUserList(data) {
  return request({
    url: '/sysUser/getSysUserList',
    method: 'post',
    data:qs.stringify(data)
  })
}
//增加编辑用户
export function addOrEditSysUser(data) {
  return request({
    url: '/sysUser/addOrEditSysUser',
    method: 'post',
    data:qs.stringify(data)
  })
}

//删除用户
export function deleteSysUser(data) {
  return request({
    url: '/sysUser/deleteSysUser',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 选择角色
export function queryAllSysRole() {
  return request({
    url: '/sysRole/queryAllSysRole',
    method: 'post',
  })
}

// --------user---end-----------



// -------premission---start--------------

// 获取权限列表
export function getSysPermissionList(data) {
  return request({
    url: '/sysPermission/getSysPermissionList',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 增加编辑权限
export function addOrEditSysPermission(data) {
  return request({
    url: '/sysPermission/addOrEditSysPermission',
    method: 'post',
    data:qs.stringify(data)
  })
}


// 删除权限列表
export function deleteSysPermission(data) {
  return request({
    url: '/sysPermission/deleteSysPermission',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 权限树
export function getSysPermssionTree() {
  return request({
    url: '/sysPermission/getSysPermssionTree',
    method: 'post'
  })
}



// -------premission---end--------------




// -------role---start--------------

// 获取角色列表
export function getSysRoleList(data) {
  return request({
    url: '/sysRole/getSysRoleList',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 增加编辑角色
export function addOrEditSysRole(data) {
  return request({
    url: '/sysRole/addOrEditSysRole',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 编辑获取权限树回显数组

export function getSysPermissionByRoleId(data) {
  return request({
    url: '/sysPermission/getSysPermissionByRoleId',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 删除角色
export function deleteSysRole(data) {
  return request({
    url: '/sysRole/deleteSysRole',
    method: 'post',
    data:qs.stringify(data)
  })
}


// -------role---end--------------


// 获取部门的下拉数据
export function getDepts() {
  return request({
    url: '/dept/getDepts',
    method: 'post',
  })
}


// 系统参数
export function getSysParamList(data) {
  return request({
    url: '/sysParam/getSysParamList',
    method: 'post',
    data:qs.stringify(data)
  })
}


export function addOrEditSysParam(data) {
  return request({
    url: '/sysParam/addOrEditSysParam',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 单个删除
export function deleteSysParam(data) {
  return request({
    url: '/sysParam/deleteSysParam',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 全部删除
export function batchDelete(data) {
  return request({
    url: '/sysParam/batchDelete',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 系统字典分类
export function getDataDictList(data) {
  return request({
    url: '/dataDictCat/getDataDictList',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function addOrEditDataDictCat(data) {
  return request({
    url: '/dataDictCat/addOrEditDataDictCat',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function deleteDataDictCat(data) {
  return request({
    url: '/dataDictCat/deleteDataDictCat',
    method: 'post',
    data:qs.stringify(data)
  })
}


export function getDataDicts() {
  return request({
    url: '/dataDictCat/getDataDicts',
    method: 'post'
  })
}






export function getDataDictItemList(data) {
  return request({
    url: '/dataDictItem/getDataDictItemList',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function addOrEditDataDictItem(data) {
  return request({
    url: '/dataDictItem/addOrEditDataDictItem',
    method: 'post',
    data:qs.stringify(data)
  })
}



export function delDataDictItem(data) {
  return request({
    url: '/dataDictItem/delDataDictItem',
    method: 'post',
    data:qs.stringify(data)
  })
}


export function getDataDictItems() {
  return request({
    url: '/dataDictItem/getDataDictItems',
    method: 'post'
  })
}

// 根据部门id查科室
export function getSectionsByDeptId(data) {
  return request({
    url: 'section/getSectionsByDeptId',
    method: 'post',
    data:qs.stringify(data)
  })
}

