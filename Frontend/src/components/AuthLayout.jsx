import {React,useState,useEffect} from 'react'

import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'


function Protected({children,authentication}) {
    const [loader,setloader]=useState(true);
    const authStatus=useSelector(state=>state.auth.status);
    // console.log(authStatus)
    const navigate=useNavigate();

    useEffect(()=>{
        if(authentication && authStatus !== authentication)//authStatus false yani ham login nahi hai abhi
        {
            navigate('/login')
        }else if(!authentication && authStatus!==authentication )
        {
            navigate('/')
        }
        setloader(false)

    },[authentication,navigate,authStatus])
  return loader? <h1>Loading...</h1>:<>{children}</>
}

export default Protected