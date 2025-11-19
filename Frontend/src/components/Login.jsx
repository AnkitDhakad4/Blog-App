import { React, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login as storelogin } from "../store/authSlice";
import { Input, Logo, Button } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { login as signin } from "../OurBackend/authentication.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    //it will be our method which we call when we hit login btn so it will take time
    setError(""); //we store each error so we just cleared here
    try {
      //ye uper vale async ke karan try catch hai
      const session = await signin(data);
      if (session) {
        dispatch(storelogin(session.data.data));
        navigate("/"); //link par toh click karna padta hai navigate se programcally bhej sakte hai
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full text-black">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center ">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Username"
              type="text"
              palceholder="Enter your Email" //...props se chla jayega
              {...register("username", {
                //ye email ek key hai
                required: true,
                // validate:{
                //     matchPatern:(value)=> /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.
                //     test(value)||
                //     "Email address must be validate address"
                // }
              })} //
            />

            <Input
              label="password"
              palceholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
