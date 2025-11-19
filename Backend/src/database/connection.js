import mongoose from "mongoose";
import DB_NAME from "./const.js";




async function connectionDB(){
    try {
        console.log(`mongoDB url is ${process.env.MONGODB_URL}`)
        const response=await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        if(response)
        {
            console.log('database is connected ',response.connection.host)
        }
    } catch (error) {
        console.log('Error while connecting the mongoDB ',error)
        throw new Error('Unable to connect the mongoDB error is- ',error)
        
    }
}

export default connectionDB;

