const getters = {
  sidebar: state => state.app.sidebar,                                      //左部菜单
  language: state => state.app.language,                                    //语言
  device: state => state.app.device,                                        //设备类型
  visitedViews: state => state.tagsView.visitedViews,                       //顶部tag页签
  cachedViews: state => state.tagsView.cachedViews,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  userInfro: state => state.user.userInfro,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs                                //每个页面的条目数
}
export default getters
