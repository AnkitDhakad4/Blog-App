import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Container,Logoutbtn,Logo} from './index.js'


function Header(){

    const navigate=useNavigate();

    
    const status = useSelector((state) => state.auth.status);
    const itemList=[
        {
            slug:'/',
            name:'Home',
            active:true
        },
        {
            name:'Login',
            slug:'/login',
            active:!status
        },
        {
            name:'Signup',
            slug:'/signup',
            active:!status
        },
        {
            name:'All Post',
            slug:'/all-post',
            active:status
        },
        {
            name:'Add Post',
            slug:'/add-post',
            active:status
        },
    ]

    return(
        <Container>
            <nav className="flex ">
                <div className="mr-4">
                    <Link to='/'>
                        <Logo/>
                    </Link>
                </div>
                <ul className="flex ml-auto">
                    {itemList.map((item)=>(
                        item.active ? 
                        <li key={item.name}>
                            {/* becasue key deni hoti hai taki virtual dom me fark pta lage */}
                            <button 
                            onClick={()=>navigate(item.slug)}
                            className='inline-block px-6 py-2 duration-200 hover:border-r-blue-100 rounded-full'
                            > {item.name}
                            </button>
                        </li> :null
                    ))}

                    {status && (
                        <li>
                            <Logoutbtn/>
                        </li>
                    )}

                </ul>
            </nav>
            
        </Container>
    )
}



export default Header;