/**
 * 配置请求地址，支持多环境
 * @param sit==>>测试开发环境
 * @param prod==>正式上线环境
 * */
module.exports = {
    // sit: "http://192.168.1.102:8080/logistics-mgt",//超哥本地
    // sit: "http://192.168.200.173:8080",//杨飞本地
    // sit:"http://flynet.imwork.net:35609/logistics-mgt",
    // sit:"https://chalk.fqyxa.com", //上线环境
       sit:"http://192.168.1.11:8080/xtsj-website",//毅豪本地
    // -----------------------------------------------------------------
    prod: "http:正式环境"
}
