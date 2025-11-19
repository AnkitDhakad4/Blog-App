import {v2 as cloudinary} from 'cloudinary'
import apiError from './apiError.js';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY,
})





const uploadOnCloudinary=async(fileBuffer,filename,mimetype,foldername)=>{
    try {
    
        const base64Data = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
    
        const response=await cloudinary.uploader.upload(base64Data,{
            folder:foldername,
            public_id:filename.split('.')[0]//bcz . ke baad mimetype hoga
        })
    
    // console.log("in uploadoncloudinary response is ",response)
        return {
            url:response.secure_url,
            public_id:response.public_id
        };
    } catch (error) {
        console.log("Error in the uploadOnCloudinary ",error)
        throw new apiError('Error in uploadOnClodinary ',400,error)
    }
}

const deleteFromCloudinary=async function(publicId) {
    try {
        const response=await cloudinary.uploader.destroy(publicId)
        return response
    } catch (error) {
        throw new apiError("Error while deleting the image from cloudinary",400,error)
    }
}


export { uploadOnCloudinary,deleteFromCloudinary}
