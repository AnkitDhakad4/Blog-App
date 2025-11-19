import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
})


axiosInstance.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config

        if(error.response?.status===401 && !originalRequest._retry)
        {
            originalRequest._retry=true;

            try{
                await axios.get(`${import.meta.env.VITE_API_URL}/user/refreshTokens`,
                    { withCredentials: true }
                );

                 return axiosInstance(originalRequest);
            }
            catch(refreshError){

                 console.log("Refresh token failed ❌", refreshError);

        // Redirect user to login page if refresh failed
                const navigate=useNavigate()
                navigate('/')
                return Promise.reject(refreshError);

            }

        }

          return Promise.reject(error);


    }
);



const login=async function(data){
    try {
        const {username,password}=data
        
        console.log("Username ",username,"\nPassword",password)
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/user/login`,{username,password},{withCredentials:true})
    
        if(!response)
        {
            throw new Error("Error while fetching the login data")
        }
    
        console.log("Response afte logging in ",response)
        return response
        
    } catch (error) {
        throw new Error("Error in login",error)
    }
}

const logup=async function(data){
    try {
        // console.log("data is ",data)
        const {username,gender,dob,email,password,avatar,name}=data
        
        // console.log(username,gender,dob,email,password,avatar,name)
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/user/register`,{username,gender,dob,email,password,avatar,name},{withCredentials:true,headers:{
            "Content-Type": "multipart/form-data"
        }})
        if(!response)
        {
            throw new Error("The user is not registered")
        }
    
        return response
    } catch (error) {
        throw error
    }
}

const logout=async function(){
   try {
    const response=await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`,{withCredentials:true})
    if(!response)
    {
     throw new Error("User is not logout")
    }
 
    return response
   } catch (error) {
    console.log("error while logging out ",error)
   }
}
export {login,logup,logout}