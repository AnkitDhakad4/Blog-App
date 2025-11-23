import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js"
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";


dayjs.extend(customParseFormat);

const returnError=(res,error)=>{
    return res.status(error.statusCode).json({status:error.statusCode,message:error.message});
}

const generateAccessandRefreshToken=async function (userId) {
try {
    
        const user=await User.findById(userId);
    
        if(!user)
        {
            throw new apiError("the user id is wrong",400)
        }
    
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken=refreshToken
        // console.log("Accesstoken is ",accessToken)
        // console.log("\nRefreshtoken is ",refreshToken)
    
        return {accessToken,refreshToken}
    
    
} catch (error) {
    console.log("error while generating the Tokens")
    throw new apiError("error while generating the Tokens",400)    
}
    
}

const registerUser=async function(req,res){
    //first we get the informations
    try {
        
        const {username,dob,name,email,password,gender}=req.body;
    
        //all field is required
        if([username,name,email,gender,dob,password].some((item)=> !item || item.trim()===""))
        {
            throw new apiError('All field are required ',400)
        }
    
        // console.log(username,dob,name,email,password,gender)
    
        //if exicted user then
        const existed=await User.findOne(
            {$or:[{username:username},{email:email}]}
        )
        if(existed)
        {
            throw new apiError('This Username or Email is already taken try another',400)
        }
    
        // console.log("On upload on cloudinary")
        const avatarUrl=await uploadOnCloudinary(req.file.buffer,req.file.newName,req.file.mimetype,'Blog-Page Profile');
        if(!avatarUrl)
        {
            throw new apiError("Error while uploading the profile image",400);
        }
    
        const createdUser=await User.create({
            username,
            email,
            name,
            password,
            gender,
            dob:dayjs(dob,"MM-DD-YYYY").toDate(),
            avatar:avatarUrl.url
        })
    

        // console.log("created user is ",createdUser)
        const {accessToken,refreshToken}=await generateAccessandRefreshToken(createdUser._id)

        if(!refreshToken)
        {
            throw new apiError("Refresh token is not generated ",500)
        }


        const findedUser=await User.findById(createdUser._id).select('-password -refreshToken')

        if(!findedUser)
        {
            throw apiError("User is not finded after creating ")
        }
    
    
        if(!findedUser)
        {
            throw new apiError("An error while registering the user ",500)
        }


        const option={
            httpOnly:true,
            secure:process.env.NODE_ENV==='Production',
            sameSite:process.env.NODE_ENV==='Production'?'none':'lax'
        }
    
    
        return res.status(200)
        .cookie('accessToken',accessToken,option)
        .cookie('refreshToken',refreshToken,option)
        .json(new apiResponse(200,"User is registered successfully ",findedUser))
    
    } catch (error) {
        console.log(error)
       return returnError(res,error);
        
    }

}

const login=async function (req,res) {
    try {
        
        const {username,password}=req.body
    
        if([username,password].some((item)=>!item || item.trim()===""))
        {
            throw new apiError("Please type username and password",400);
        }
        
        // console.log("Username and password is ",username," ",password)
        
        const user=await User.findOne({username:username});
        if(!user)
        {
            throw new apiError("User is not registered ",400)
        }
    
        const isPasswordCorrect=await user.isPasswordCorrect(password)

        if(!isPasswordCorrect)
        {
            throw new apiError("Password is not correct",400)
        }
    
        const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id)
    
    
        if(!refreshToken)
        {
            throw new apiError("Refresh token is not generated ",500)
        }
    
        
    
        const loginUser=await User.findById(user._id).select('-password -refreshToken')
    
        const option={
            httpOnly:true,
            secure:process.env.NODE_ENV==='Production',
            sameSite:process.env.NODE_ENV==='Production'?'none':'lax'
        }
    
    
        return res.cookie('accessToken',accessToken,option)
        .cookie('refreshToken',refreshToken,option)
        .json(new apiResponse(200,'user is loggedin',loginUser))
        
    
    } catch (error) {
        // console.log("Error while login:- ",error)
        return returnError(res,error)
        // throw new apiError("Error while login",400,error)
    }    
}


const refreshTokens=async function(req,res){
    try {
        const user=req.userInfo
        if(!user)
            {
                throw new apiError
                ('Please login first ',400)
            }
            // console.log(user)
            const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id);
            
            console.log(accessToken,'\n')
        console.log(refreshToken)
        if(!accessToken)
        {
            throw new apiError("Error while generating the accessToken ",500)
        }
        
        const loginUser=await User.findById(user._id).select('-password -refreshToken')
        
        const option={
            httpOnly:true,
            secure:process.env.NODE_ENV==="Production",
            sameSite:process.env.NODE_ENV==="Production"?'none':'lax'
        }
        res.cookie('accessToken',accessToken,option)
        .cookie('refreshToken',refreshToken,option)
        .json(new apiResponse(200,'New tokens are generated',loginUser))
    } catch (error) {
        return returnError(res,error);
    }
    
}

const logout=async function(req,res){
    try {
        const user=req.userInfo;
        
        if(!user)
        {
            throw new apiError("Please login first",400)
        }
    
        const response=await User.findOneAndUpdate(user._id,{$unset:{refreshToken:1}})
        
        if(!response)
        {
            throw new apiError('The refreshToken is not vanished',400)
        }
    
        const option={
            httpOnly:true,
            secure:process.env.NODE_ENV==="Production",
            sameSite:process.env.NODE_ENV==="Production"?'none':'lax'
        }
    
        res.clearCookie('accessToken',option)
        .clearCookie('refreshToken',option)
        .json(new apiResponse(200,'User is loggedOut Successfully'))
    } catch (error) {
        return returnError(res,error)
    }
}




export {registerUser,login,refreshTokens,logout}





































// const refreshTokens=async function(req,res){
//     const oldaccessToken=req.cookies.accessToken;

//     if(!oldaccessToken)
//     {
//         throw new apiError("AccessToken requires ",400)
//     }

//     const user=jwt.verify(oldaccessToken,process.env.ACCESS_TOKEN)

//     if(!user)
//     {
//         throw new apiError("Invalid accessToken",400)
//     }
//     // console.log(user)
//     const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id);

//     // console.log(accessToken)
//     // console.log(refreshToken)
//     if(!accessToken)
//     {
//         throw new apiError("Error while generating the accessToken ",500)
//     }

//     const loginUser=await User.findById(user._id).select('-password -refreshToken')

//     const option={
//         httpOnly:true,
//         secure:process.env.NODE_ENV==="Production",
//         sameSite:process.env.NODE_ENV==="Production"?'none':'lax'
//     }
//     res.cookie('accessToken',accessToken,option)
//     .cookie('refreshToken',refreshToken,option)
//     .json(new apiResponse(200,'New tokens are generated',loginUser))
    
// }