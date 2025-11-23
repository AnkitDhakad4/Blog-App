import jwt from "jsonwebtoken";
import apiError from '../utils/apiError.js';
import { User } from '../models/user.models.js';


const returnError=(res,error)=>{
    return res.status(error.statusCode).json({status:error.statusCode,message:error.message});
}

const verifyjwt=async function(req,res,next){
    try {
        const accessToken=req.cookies.accessToken;
        // console.log("In verifyjwt ",req.cookies);
        
        
        if(!accessToken)
        {
            throw new apiError('Invalid accessToken ',400);
        }
    
        const user=jwt.verify(accessToken,process.env.ACCESS_TOKEN)
        
        const loggedIn=await User.findById(user._id).select('-password -refreshToken')
    
        if(!loggedIn)
        {
            throw new apiError('User is Not found ',400)
        }
        req.userInfo=loggedIn
    
        next();
    } catch (error) {
        return returnError(res,error)
    }

}


export default verifyjwt