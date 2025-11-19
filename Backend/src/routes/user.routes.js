import {Router} from 'express'
import { rename, upload } from '../middleware/multer.js'
import { login, logout, refreshTokens, registerUser } from '../controllers/user.controllers.js'
import verifyjwt from '../middleware/verifyjwt.js'


const router=Router()


router.route('/register').post(upload.single('avatar'),rename,registerUser)
router.route('/login').post(login)
router.route('/refreshTokens').get(verifyjwt,refreshTokens)
router.route('/logout').get(verifyjwt,logout)



export default router





