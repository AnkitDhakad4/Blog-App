import { React, useState } from "react";
import { login as storelogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logup } from "../OurBackend/authentication.js";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [loading, setloading] = useState(false);

  const signup = async (data) => {
    try {
      setloading(true);
      setError("");
      const formData = new FormData();
      formData.username = data.username;
      formData.name = data.name;
      formData.avatar = data.avatar[0];
      formData.email = data.email;
      formData.gender = data.gender;
      formData.dob = data.dob;
      formData.password = data.password;
      // console.log(formData);

      const response = await logup(formData);
      if (!response) {
        throw new Error("User is not been registered");
      }

      
      dispatch(storelogin(response.data.data));
      navigate("/");
    } catch (error) {
      
      console.log(error);
      setError(error.response.data);
      // throw new Error("THe server is not reached while registering",error)
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center text-black">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-400 rounded-xl p-10 border border-black/10 shadow-2xl`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error.message}</p>}

        <form onSubmit={handleSubmit(signup)} className="space-y-5 mt-8">
          {/* Name */}
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            className="border-gray-300 focus:border-black/50 focus:ring focus:ring-red-600"
            {...register("name", { required: true })}
          />

          {/* Username */}
          <Input
            label="Uername"
            placeholder="Choose your username"
            className="border-gray-300 focus:border-black/50 focus:ring focus:ring-red-600"
            {...register("username", { required: true })}
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your Email"
            className="border-gray-300 focus:border-black/50 focus:ring focus:ring-red-600"
            {...register("email", { required: true })}
          />

          {/* DOB */}
          <Input
            label="Date of Birth"
            placeholder="MM-DD-YYYY"
            maxLength={10}
            title="Enter date in MMDDYYYY format"
            className="border-gray-300 focus:border-black/50 focus:ring focus:ring-red-600"
            {...register("dob", { required: true })}
            onChange={(e) => {
              let input = e.target.value.replace(/\D/g, ""); // Remove anything not a digit

              if (input.length > 2) {
                input = input.slice(0, 2) + "-" + input.slice(2);
              }
              if (input.length > 5) {
                input = input.slice(0, 5) + "-" + input.slice(5, 9);
              }

              e.target.value = input;
            }}
          />

          {/* GENDER — aligned perfectly with Input layout */}
          <div className="w-full flex items-center gap-4 py-2">
            <label
              htmlFor="gender"
              className="max-w-1/3 text-left font-medium text-black"
            >
              Gender
            </label>

            <select
              id="gender"
              className="flex-1 px-3 py-2 rounded-lg bg-white text-black 
                     border border-gray-300 shadow-sm outline-none 
                     focus:ring-2 focus:ring-red-600 focus:border-gray-400 
                     transition-all duration-200"
              {...register("gender", { required: true })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Avatar */}
          <Input
            label="Avatar"
            type="file"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full 
                   file:border-0 file:text-sm file:font-semibold  focus:ring-red-600
                   file:bg-black file:text-white hover:file:bg-black/80"
            {...register("avatar", { required: true })}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            className="border-gray-300 focus:border-black/50 focus:ring focus:ring-black/20"
            {...register("password", { required: true })}
          />

          {/* Submit Button */}
          <Button
            className="w-full bg-black hover:bg-black/90 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
