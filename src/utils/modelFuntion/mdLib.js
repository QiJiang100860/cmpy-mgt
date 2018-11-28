/**
 * 页面通用的函数请求封装---【tip】适用常见的列表展示增删改查，其他自行在模块内完成开发
 * @argument ctx @description 模块名的this指向
 * @argument funcs @description 模块的请求函数集合
 * @argument modelName @description 模块名---不一定以文件夹名称对应，以后台返回的接口对应。【注意】1、前后台的接口规范 2、首字母大写（将来优化）
*/

export const mdlib = (ctx, funcs, modelName) => {
    const seachF = `get${modelName}List`//待定，估计就是get,传参不一样即可
    const addF = `addOrEdit${modelName}`
    const delF = `del${modelName}`//待定
    const editF = `addOrEdit${modelName}`
    const checkF = `get${modelName}List`
    // 异步请求函数
    const postFun = (funName, param) => {
        return funcs[funName](param).then(res => {
            resolve(res)
        }).then(() => {
            reject()
        })
    }
    // 搜索
    const seach = () => {
        const _this = ctx
        return new Promise((resolve, reject) => {
            postFun(seachF,_this.seacherParam)
        })
    }
    // 重置搜索条件
    const reset = () => {
        const _this = ctx
        const param = _this.seacherParam
        for (const key in param) {
            param[key] = null
        }
    }
    // 增
    const add = () => {
        const _this = ctx
        return new Promise((resolve, reject) => {
            postFun(addF,_this.dialogBindData)
        })
    }
    // 删
    const del = () => {
        const _this = ctx
        return new Promise((resolve, reject) => {
            postFun(delF,_this.dialogBindData)
        })
    }
    // 改
    const edit = () => {
        const _this = ctx
        return new Promise((resolve, reject) => {
            postFun(editF,_this.dialogBindData)
        })
    }
    // 查
    const check = () => {
        const _this = ctx
        return new Promise((resolve, reject) => {
            postFun(checkF,_this.dialogBindData)
        })
    }

    return {seach,reset,add,del,edit,check}
}
