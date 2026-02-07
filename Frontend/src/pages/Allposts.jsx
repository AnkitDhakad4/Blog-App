import React, { useEffect, useState } from 'react'
import {Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { getPrivatePosts } from '../OurBackend/dataBase';
// import React from 'react';

function Allposts() {
    const [posts ,setPost]=useState([]);
    const rawUser = useSelector((state) => state.auth.userData)
    const userData = rawUser?.userData || rawUser
    // console.log(userData)
    useEffect(()=>{
        async function getPrivate() {
            try {
                const res=await getPrivatePosts()
                if(!res)
                {
                    console.log("Error while getting posts")
                }
                console.log("response in getPrivatePosts ",res.data)
                setPost( res.data);
            } catch (error) {
                console.log(error)
            }
        }

        getPrivate()
        
        
    },[])
    // console.log("In allpost in container ",posts[0].user)
    
  return (
     <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post)=>(
                                <div className='p-2 w-1/4 ' key={post._id}>
                                    {<PostCard post={post}/>}
                                    </div>
                            ))}
                        </div>
                    </Container>
                </div>
  )
}

export default Allposts