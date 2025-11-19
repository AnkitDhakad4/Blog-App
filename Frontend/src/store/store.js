import {configureStore} from "@reduxjs/toolkit"
import authReducer  from "./authSlice.js";  

// const store= 
 

export default configureStore({
    reducer:{
        auth:authReducer 
    }
});