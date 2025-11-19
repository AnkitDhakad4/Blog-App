import multer from 'multer'
import path from 'path'
const storage=multer.memoryStorage();


const upload=multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const allowed=/jpeg|jpg|png/;
        // console.log("file in upload ",file)
        allowed.test(file.mimetype)?cb(null,true):cb(new Error('Only image is allowed'));
    }
})


const rename=(req,res,next)=>{
    if(req.file)
    {
        // console.log("In multer ",req.file)
        const ext=path.extname(req.file.originalname);//this is extracting the file type like .pdf .png or etc ext stor it with the dot e.g. ext=.png 
        req.file.newName=`${req.file.originalname}${Date.now()}${ext}`;
    }
    next();

}


export {rename,upload}