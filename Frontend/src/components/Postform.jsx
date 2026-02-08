import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {Container, Button, Input, Select, RTE } from "./index.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost, createPost } from "../OurBackend/dataBase";


function Postform({ post }) {
  const [issubmitting, setissubmitting] = useState(false);
  const [isupdating, setisupdating] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm();
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        isPublished: String(post.isPublished) || "true",
      });
    }
  }, [post, reset]);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const status = useSelector((state) => state.auth.status);
  console.log("status in Postform ",status)

  // console.log('user in postform ',userData)
  const submit = async (data) => {
    if (userData === undefined) {
      //Redux state (auth.userData) is populated asynchronously (probably after an API call or Appwrite session check).
      //toh age na jake yahi reh jayega
      return <p>Loading...</p>;
    }

    if (post) {
      const formData = new FormData();
      formData.postId = post._id;
      // console.log(formData.postId);
      formData.title = data.title;
      formData.content = data.content;
      formData.image = data.image[0];
      formData.slug = data.slug;
      formData.isPublished = data.isPublished;

      try {
        setisupdating(true);
        const updatedPost = await updatePost(formData);

        if (!updatedPost) {
          throw Error("Error while updating the post");
        }

        navigate(`/post/${updatedPost._id}`);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setisupdating(false);
      }
    } else {
      const formData = new FormData();
      formData.title = data.title;
      formData.content = data.content;
      formData.image = data.image[0];
      formData.slug = data.slug;
      formData.isPublished = data.isPublished;

      try {
        setissubmitting(true);
        const createdPost = await createPost(formData);

        if (!createdPost) {
          throw Error("Error while creating the post");
        }

        navigate(`/post/${createdPost._id}`);
      } catch (error) {
        console.error(error);
        navigate('/')
        throw error;
      } finally {
        setissubmitting(false);
      }
    }
  };

  //   const slugTransform = useCallback((value) => {
  //     if (value && typeof value === "string") {
  //       return value.trim().toLowerCase();
  //     }
  //   }, []);
  if (status == true) {
    return (
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col lg:flex-row gap-8 bg-[#1e1e1e] p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        {/* LEFT PANEL */}
        <div className="flex-1 space-y-6 text-gray-700">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Title :
            </label>
            <Input
              placeholder="Write your title..."
              className="rounded-lg shadow-sm bg-[#2b2b2b] text-black border-gray-600 focus:border-red-500"
              {...register("title", { required: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Slug :
            </label>
            <Input
              placeholder="my-blog-slug"
              className="rounded-lg shadow-sm bg-[#2b2b2b] text-black border-gray-600 focus:border-red-500"
              {...register("slug", { required: true })}
            />
          </div>

          <div className="p-4 bg-[#2a2a2a] border border-gray-700 rounded-xl shadow-sm focus:border-red-500">
            <RTE
              label="Content :"
              name="content"
              control={control}
              {...register("content", { required: true })}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/3 space-y-6 text-black">
          <div className="p-4 border border-gray-700 rounded-xl bg-[#2a2a2a] shadow-sm focus:border-red-500">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Featured Image :
            </label>
            <Input
              type="file"
              className="text-black"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />

            {post && (
              <div className="mt-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl shadow"
                />
              </div>
            )}
          </div>

          <div className="px-4 py-3 border border-gray-700 rounded-xl bg-[#2a2a2a] shadow-sm">
            <Select
              options={["true", "false"]}
              label="isPublished"
              className="text-gray-700"
              defaultValue={getValues("isPublished")}
              {...register("isPublished", { required: true })}
            />
          </div>

          {/* BUTTON */}
          <div className="mt-4">
            {post ? (
              <Button
                bgColor="bg-green-600 hover:bg-green-700"
                type="submit"
                disabled={isupdating}
                className="w-full py-3 rounded-xl text-lg shadow"
              >
                {isupdating ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Updating...
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={issubmitting}
                className="w-full py-3 rounded-xl text-lg shadow bg-blue-600 hover:bg-blue-700"
              >
                {issubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read Posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Postform;
