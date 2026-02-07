import { Post } from "../models/post.models.js";
import apiError from "../utils/apiError.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";

const returnError=(res,error)=>{
    return res.status(error.statusCode).json({status:error.statusCode,message:error.message});
}


const createPost = async function (req, res) {
  try {
    const user = req.userInfo;
    const { title, slug, content, isPublished } = req.body;

    if (
      [title, slug, content, isPublished].some(
        (item) => !item || item.trim() === ""
      )
    ) {
      throw new apiError("All field of post is required ", 400);
    }

    // console.log(title,slug,content,isPublished,"Req. file is ",req.file);
    const postUrl = await uploadOnCloudinary(
      req.file.buffer,
      req.file.newName,
      req.file.mimetype,
      "Blog-Page Post"
    );

    if (!postUrl) {
      throw new apiError("Error while uploading the image to cloudinary", 500);
    }

    const newPost = await Post.create({
      title,
      content,
      isPublished,
      slug,
      owner: user._id,
      image: postUrl.url,
      imagePublicId: postUrl.public_id,
    });

    if (!newPost) {
      throw new apiError("Error while creating the post ", 500);
    }

    const createdPost = await Post.findById(newPost._id).select(
      "-imagePublicId"
    );

    if (!createPost) {
      throw new apiError("Post is not created ", 500);
    }

    return res.json(
      new apiResponse(200, "Post is created successfully", createdPost)
    );
  } catch (error) {
    return returnError(res,error)
  }
};

const getAllPost = async function (req, res) {
  const user = req.userInfo;
  // console.log("User is", user);
  try {
    if (!user) {
      throw new apiError("Please first login to see the post", 401);
    }

    const allPost = await Post.aggregate([
      {
        $match: {
          isPublished: true,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $unset: ["imagePublicId"],
      },
    ]);

    if (!allPost) {
      throw new apiError("Error while getiin the posts", 500);
    }
    // console.log(allPost);

    return res.json(
      new apiResponse(200, "All the post are fetched successfully", allPost)
    );
  } catch (error) {
    return returnError(res,error)
  }
};

const getPrivatePosts = async function (req, res) {
  try {
    const user = req.userInfo;
    console.log(user)

    if (!user) {
      throw new apiError("Please first login to see the post", 400);
    }

    const privatePost = await Post.aggregate([
      {
        $match: {
          owner: user._id,
        },
      },
      {
        $sort: {
          createdAt: -1, //this is ensuring that latest post at first
        },
      },
    ]);
    

    if (!privatePost) {
      throw new apiError("Error while getting the privatePost ", 500);
    }

    return res.json(
      new apiResponse(200, "Fetched all the privete post ", privatePost)
    );
  } catch (error) {
    return returnError(res,error)
  }
};

const editPost = async function (req, res) {
  try {
    const user = req.userInfo;

    const { postId, title, content, slug, isPublished } = req.body;

    const isAvailable=await Post.findById(postId)
    if(!isAvailable)
    {
      throw new apiError("Post is not available",400)
    }

    const updateData = {
      owner: user._id,
    };

    if (title?.trim()) {
      //it is checking that the title is came from req or not
      updateData.title = title.trim();
    }

    if (content?.trim()) updateData.content = content.trim();
    if (slug?.trim()) updateData.slug = slug.trim();
    if (isPublished) updateData.isPublished = isPublished;

    if (req.file) {
      const updatedUrl = await uploadOnCloudinary(
        req.file.buffer,
        req.file.newName,
        req.file.mimetype,
        "Blog Page Post"
      );
      if (!updatedUrl) {
        throw new apiError("Error while upload the image", 400);
      }

      updateData.image = updatedUrl.url;
      updateData.imagePublicId = updatedUrl.public_id;
    }
    
    const updatedPost = await Post.findOneAndUpdate(
      {
        owner: user._id,
        _id: postId,
      },
      {
        $set: updateData,
      },
      {
        new: true,
      }
    ).select('-imagePublicId')

    
    const isPhotoDeleted=await deleteFromCloudinary(isAvailable.imagePublicId);

    if (!updatedPost) {
      throw new apiError("error while uploading the image", 400);
    }

    return res.json(
      new apiResponse(200, "Post is updated successfully", updatedPost)
    );
  } catch (error) {
    return returnError(res,error)
  }
};

const deletePost = async function (req, res) {
  try {
    const user = req.userInfo;

    const { postId } = req.query;
    console.log(postId);
    const isAvailable = await Post.findOne({
      _id: postId,
      owner: user._id,
    });

    if (!isAvailable) {
      throw new apiError("Can not delete other`s post", 400);
    }

    const imagePublicId = isAvailable.imagePublicId;
    // console.log("data puiblic id",imagePublicId)
    const deletedPost = await Post.deleteOne({
      _id: postId,
      owner: user._id,
    });
    // console.log("After deleting the post response is ",deletedPost)
    const deletedImage = await deleteFromCloudinary(imagePublicId);
    // console.log("After deleting the image response is ",deletedImage)
    if (!deletedImage) {
      throw new apiError("Image is not deleted", 400);
    }

    return res.json(
      new apiResponse(200, "Post content and image is successfully deleted ", {
        deletedPost,
        deletedImage,
      })
    );
  } catch (error) {
    return returnError(res,error)
  }
};

const getPost = async function (req, res) {
  try {
    const { postId } = req.query;
    // console.log("in getPost the postId is",postId);
    if (!postId) {
      throw new apiError("Can not get the Post Id", 400);
    }

    const postData = await Post.findOne({ _id: postId });

    if (!postData) {
      throw new apiError("Can not get the post", 500);
    }

    return res
      .status(200)
      .json(new apiResponse(200, "Post is fetched successfully", postData));
  } catch (error) {
    return returnError(res,error)
  }
};

// const isOwner=async function(req,res){
//   const user = req.userInfo;

//     const { postId } = req.body;
//     // console.log(postId);
//     const isAvailable = await Post.findOne({
//       _id: postId,
//       owner: user._id,
//     });

//     if(!isAvailable)
//     {
//       res.json(new apiResponse(200,"He is not the author"))
//     }
// }

export {
  createPost,
  getAllPost,
  getPrivatePosts,
  editPost,
  deletePost,
  getPost,
};
