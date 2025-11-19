import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './Appwrite/Authentication';
import { login, logout } from './store/authSlice';
import { Header,Footer } from './components';
import { Outlet } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getcurrentUser()//authService.getcurrentUser() returns a Promise (async call) that why we used .then() and etc
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout())
      }
    }).finally(()=>setLoading(false))
  },[])

  return (
    <>
    <Header/>
    <Outlet/>
    {/* <h1 className='text-red-600 text-4xl'>Jai Shree Ram</h1> */}
    <Footer/>
    </>
  )
}

export default App


//  useEffect((userData)=>{
//       const user=authService.getcurrentUser();

//       if(user)
//       {
//         dispatch(login({user}));
//         setLoading(false);
//       }
//       else{
//         console.log("error")
//       }

//   },[])