import moment from 'moment'

export const fattCreateTime = (time,str)=>{
    if(str==="d"){
        return moment(time).format('YYYY-MM-DD')  
    }else{
        return moment(time).format('YYYY-MM-DD HH:mm:ss')  
    }
}