import axios from "axios";


// const createPost=async function(data)
// {
//     const {title,slug,content,isPublished,image}=data;

// }


const getAllPost=async function(){
   try {
     const data=await axios.get(`${import.meta.env.VITE_API_URL}/post/getAllPost`,{withCredentials:true});
 
     if(!data)
     {
         throw new Error("Unable to get the Posts")
     }
 
    //  console.log("data in geallpost at database ",data.data.data);
     return data.data
   } catch (error) {
    throw new Error("Can not get the all post",error);
   }
}


const getPost=async function(postId){

    try {
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/post/getPost`,{
            params:{postId},
            withCredentials:true})
    
        if(!response)
        {
           throw Error("Post is not fetched") 
        }
        
        // console.log("Response in database getPost ",response.data);
        
        return response.data.data
    } catch (error) {
        throw new Error("Error while gettin the post");
    }
}

const deletePost=async function(postId){
    try {
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/post/deletePost`,{
            withCredentials:true,
            params:{postId}
        })
        
        if(!response)
            {
               throw Error("Post is not deleted") 
            }
            
            // console.log("Response in database getPost ",response.data);
            
            return response.data
    } catch (error) {
        console.error(error)
    }
}

const createPost=async function(data){
    try {
        const {title,content,image,slug,isPublished}=data;
    
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/post/createPost`,
            {title,content,image,slug,isPublished},
            {withCredentials:true,
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            }
        )
    
        return response?.data.data
    } catch (error) {
        console.error(error);
        throw new Error("Error while generating the post",error);
    }
}


const updatePost=async function(data){
    try {
        const {postId,title,content,image,slug,isPublished}=data;
    
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/post/editPost`,
            {postId,title,content,image,slug,isPublished},
            {withCredentials:true,
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            }
        )
    
        return response?.data.data
    } catch (error) {
        console.error(error);
        throw new Error("Error while updating the post",error);
    }

}

const getPrivatePosts=async function(){
    try {
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/post/getPrivatePosts`,{
            withCredentials:true
        })
    
        if(!response)
        {
            throw new Error('Error while getting private posts',error)
        }
    
        return response.data;
        
    } catch (error) {
        throw error
    }
}

export {getAllPost,getPost,deletePost,createPost,updatePost,getPrivatePosts}