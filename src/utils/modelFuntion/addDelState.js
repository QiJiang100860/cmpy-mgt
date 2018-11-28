//为表格数据添加删除状态
export const addDelState = data => {
    if(data.length){
        let newData = []
        for(const item of data){
            item.delState = false;
            newData.push(item)
        }
        return newData
    }
    return []
    
}