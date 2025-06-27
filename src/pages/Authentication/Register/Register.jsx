import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser , updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState('')

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        // user info in the database (update)

        // user prfile in firebase  (update)
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
        .then(() => {console.log('profile pic updated');})
        .catch(err => {console.log(err);})

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageUpload = async(e) =>{

    const image = e.target.files[0]

    console.log(image);
    const formData = new FormData()
    formData.append('image', image)

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    const res = await axios.post(imageUploadUrl, formData)
    setProfilePic(res.data.data.url);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border p-3 rounded-2xl border-gray-300"
      >
        <fieldset className="fieldset">
          <h2 className="text-3xl mb-11 font-semibold text-center">
            Create An Account here
          </h2>
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="name"
          />
          {
            errors.name?.type === 'required' && 
            <p className="text-red-400">Name is required</p>
          }

          <label className="label">Photo</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="input w-full"
            placeholder="profile"
          />
          
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-400">Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input w-full"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-400">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-400">
              Password must be 6 characters or longer
            </p>
          )}

          <p className=" text-lime-500 font-semibold btn-link">
            <Link to="/login">Click here for login</Link>
          </p>

          <button className="btn bg-lime-400 mt-4">Register</button>
        </fieldset>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Register;
