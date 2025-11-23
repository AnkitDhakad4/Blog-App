import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import authService from '../Appwrite/Authentication'
import { logout as storeLogout} from '../store/authSlice'
import { logout } from '../OurBackend/authentication.js'


function Logoutbtn() {

    
    const dispatch=useDispatch();
    const handleclick=()=>{
        logout().then((data)=>{
          console.log(data);
          dispatch(storeLogout());
          
        }).catch((err)=>{
          console.log("Error while loggin out",err);
        })
    }
  return (
    <button onClick={handleclick} className='inline-block px-6 py-2 duration-200 hover:border-r-blue-100 rounded-full' >Logout</button>
  )
}

export default Logoutbtn