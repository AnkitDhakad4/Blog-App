import React, { useEffect, useState } from 'react'
import {Container, PostCard } from '../components'
import service from '../Appwrite/Database'
import { useSelector } from 'react-redux';
// import React from 'react';

function Allposts() {
    const [posts ,setPost]=useState([]);
    const rawUser = useSelector((state) => state.auth.userData)
    const userData = rawUser?.userData || rawUser
    // console.log(userData)
    useEffect(()=>{
        service.getPosts([]).then((data)=>{
            if(data)
            {
                
                setPost(data.documents)
                // console.log("in allposts in pages ",data.documents)
            }
        })
    },[])
    // console.log("In allpost in container ",posts[0].user)
    
  return (
    <div className='w-full py-8'>
      <Container className='flex-flex-wrap'>
        {
            posts?.map((post)=>{
            
                    return(<div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post}/>
                </div>)
                
            })
        }
        </Container>  
    </div>
  )
}

export default Allposts