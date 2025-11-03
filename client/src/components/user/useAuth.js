import {useSelector} from "react-redux"
import {jwtDecode} from "jwt-decode"

const useAuth=()=>{
    let {token}=useSelector((state)=>state.auth)
    if(!token)
      return null
    const obj=jwtDecode(token);
    const {roles,name,_id,username,email} =obj;

    return obj

}

export default useAuth;


