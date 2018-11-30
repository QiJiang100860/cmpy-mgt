// 公共提交，清空函数
export const submmit = (ctx, postFun) => {
  const _this = ctx
  return new Promise((resolve, reject) => {
    if (postFun) {
      let param = {
        pageNo: 1,
        pageSize: 10
      };
      
      for (const key in _this.seacherParam) {
        if (_this.seacherParam[key]===0 || _this.seacherParam[key]) {
          param[key] = _this.seacherParam[key]
        }
      }
      postFun(param).then(res => {
        resolve(res)
      }).catch(() => {
        reject()
      })
    }
  })
}
export const reset = (ctx) => {
  const _this = ctx
  const param = _this.seacherParam
  for (const key in param) {
    // 添加这个过滤 是为了兼容一个接口
    if(key!='advertType'){
      param[key] = null
    }
  }
}
