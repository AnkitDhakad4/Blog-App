import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import connectionDB from './src/database/connection.js'
import app from './src/app.js'




const PORT=process.env.PORT || 3000


connectionDB()
.then(
    app.listen(PORT ,()=>{
    console.log('Server is listening on Port:',PORT)
    console.log(`Server URL is: http://localhost:${PORT}`)
})
).catch((error)=>{
    console.log("Error while connectiong DB ",error)
})

// app.get('/',(req,res)=>{
//     res.send({
//         active:true,
//         error:false
//     }).status(200)
// })


