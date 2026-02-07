import {configureStore} from "@reduxjs/toolkit"
import authReducer  from "./authSlice.js";  

// const store= 
 

export default configureStore({
    reducer:{
        auth:authReducer //ye is auth(key)  se hi ham sab kuch access karte hai jese state.auth.status or state.auth.userData
    }
});