import axios from "axios"
import { API_URL,logout} from "../../NwConfig"
export default async function Logout() {
    try{
        const url=API_URL+logout
        const request=await axios.post(url,
            { withCredentials: true }
        )
        const response=await request.data;
        // console.log(response)
        return response
    }catch(error){
        // console.log(error)
        return error.message
    }
    
}