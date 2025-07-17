import { creat } from 'zustand';
import UserApi from '../api/UserApi.js'
import { setToken,clearToken} from '../utils/token.js'
const useLoginStore = create ((set)=>({
    token: "",
    userLogin: async (userForm) =>{
        const {data} =await UserApi.login(userForm);
        if(data.code === 200){
            localStorage.setItem("zhifou-user",JSON.stringify(data.data.userInfo))
            setToken(data.data.token)
        }else{
            throw new Error(data.message)
        }
    },
    userLogout:()=>{
        clearToken();
        localStorage.removeItem("zhifou-user")
    }
}));
export deault useLoginStore