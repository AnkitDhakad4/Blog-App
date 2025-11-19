import React from 'react'
import { useEffect,useState } from 'react'
import { Container,PostCard } from '../components'

import { getAllPost } from '../OurBackend/dataBase.js' 

function Home() {
    const [posts,setPosts]=useState([])
    // console.log("posts printing from home", posts.documents)
    useEffect(()=>{
       async function fetchData() {
        try {
            const data=await getAllPost();
            setPosts(data.data)
        }catch(err){
            console.log("Error while getting the data",err)
        }
       }

       fetchData();
    },[])

    if(posts.length===0)
    {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read Posts
                            </h1>

                        </div>

                    </div>
                </Container>

            </div>
        )
    }else{
        return(
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
}

export default Home