import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
     formState: {errors}
  } = useForm();

  const { createUser } = UseAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
    .then(res =>{
        console.log(res.user);
    })
    .catch(err =>{
        console.log(err);
    })
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded-2xl border-gray-300">
        <fieldset className="fieldset">
            <h2 className="text-3xl mb-11 font-semibold text-center">Create An Account here</h2>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", {required: true})}
            className="input w-full"
            placeholder="Email"
          />

          {
            errors.email?.type === 'required' && <p className="text-red-400">Email is required</p>
          }

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {required: true, minLength: 6})}
            className="input w-full"
            placeholder="Password"
          />

          {
            errors.password?.type === 'required' && <p className="text-red-400">Password is required</p>
          }
          {
            errors.password?.type === 'minLength' && <p className="text-red-400">Password must be 6 characters or longer</p>
          }

          <p className=" text-lime-500 font-semibold btn-link"><Link to='/login'>Click here for login</Link></p>

          <button className="btn bg-lime-400 mt-4">Register</button>
        </fieldset>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Register;
