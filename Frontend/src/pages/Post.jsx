import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { getPost, deletePost } from "../OurBackend/dataBase.js";

export default function Post() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isAuthor, setisAuthor] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [deleting, setdeleting] = useState(false);

  useEffect(() => {
    async function fetchPost(postId) {
      try {
        const response = await getPost(postId);
        if (response) {
          //   console.log(response.owner);
          //   console.log(userData._id);
          setPost(response);

          if (response.owner == userData._id) {
            setisAuthor(true);
          }
        }
      } catch (error) {
        console.log("error in POST ", error);
      }
    }

    fetchPost(postId);
  }, []);

  const deletePostNow = () => {
    setdeleting(true);
    deletePost(postId)
      .then((response) => {
        if (response) {
          //ye d lagana bhul gaye
          navigate("/");
        }
      })
      .catch((error) => {
        confirm.error(error);
      })
      .finally(() => {
        setdeleting(false);
      });
  };

  return post ? (
  <div className="py-10 bg-[#1b1b1b] rounded-3xl text-gray-200">
    <Container>

      {/* IMAGE + ACTION BUTTONS */}
      <div className="
        w-full 
        flex justify-center 
        mb-10 
        relative 
        rounded-2xl 
        p-5 
        bg-[#242424] 
        shadow-xl 
        border border-gray-700
      ">

        <img
          src={post.image}
          alt={post.title}
          className="
            rounded-xl 
            w-3/5 
            max-h-[520px] 
            object-cover 
            border border-gray-700 
            shadow-xl
          "
        />

        {isAuthor && (
          <div className="absolute right-6 top-6 flex gap-4">
            <Link to={`/edit-post/${post._id}`}>
              <Button
                bgColor="bg-green-600 hover:bg-green-700"
                className="shadow-lg rounded-xl px-5 py-2.5 font-semibold"
              >
                Edit
              </Button>
            </Link>

            <Button
              bgColor="bg-red-600 hover:bg-red-700"
              onClick={deletePostNow}
              disabled={deleting}
              className="shadow-lg rounded-xl px-5 py-2.5 font-semibold"
            >
              {deleting ? (
                <div className="flex items-center gap-2">
                  <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        )}
      </div>

      {/* TITLE */}
      <div className="w-full mb-6 px-2">
        <h1 className="text-4xl font-bold text-gray-100 tracking-wide leading-tight">
          {post.title}
        </h1>
      </div>

      {/* CONTENT */}
      <div className="
        browser-css 
        bg-[#242424] 
        p-8 
        rounded-2xl 
        border border-gray-700 
        shadow-xl 
        leading-relaxed 
        text-gray-300
      ">
        {parse(post.content)}
      </div>

    </Container>
  </div>
) : null;


}
