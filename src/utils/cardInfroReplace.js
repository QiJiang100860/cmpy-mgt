export const cardInfroReplace = (infro) => {
    // 去除所有的空格和制表符
    const Trim = (str, is_global) => {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (is_global.toLowerCase() == "g") {
            result = result.replace(/\s/g, "");
        }
        return result;
    }
    let step1 = Trim(infro,"g");
    // 转换编译符号
    let step2 = step1.replace(/\\/g, '\/');
    return step2
}