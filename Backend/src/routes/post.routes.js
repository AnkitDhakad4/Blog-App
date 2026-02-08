import { Router } from "express";
import verifyjwt from "../middleware/verifyjwt.js";
import { createPost, deletePost, editPost, getAllPost, getPost, getPrivatePosts } from "../controllers/post.controller.js";
import { rename, upload } from "../middleware/multer.js";

const router=Router()


router.route('/createPost').post(upload.single('image'),rename,verifyjwt,createPost)
router.route('/editPost').post(upload.single('image'),rename,verifyjwt,editPost)
router.route('/getAllPost').get(verifyjwt,getAllPost)
router.route('/getPrivatePosts').get(verifyjwt,getPrivatePosts)
router.route('/deletePost').get(verifyjwt,deletePost)
router.route('/getPost').get(getPost)

router.route('/').get((req,res)=>{
    return res.json({"Status":"okay","Message":"Everything is working in Post"})
})




export default router