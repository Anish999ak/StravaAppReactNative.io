import { GETACCESSTOKEN } from "./action.types"

const getToken=(token:string)=>(dispatch:any)=>
{
    return dispatch({type:GETACCESSTOKEN,payload:token});
}

export {getToken};