import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border p-3 rounded-2xl border-gray-300 "
      >
        <fieldset className="fieldset">
          <h2 className="text-3xl mb-11 font-semibold text-center">Login here</h2>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
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

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <p className="text-lime-500 font-semibold btn-link">
            <Link to="/register">Click here to Register</Link>
          </p>

          <button className="btn bg-lime-400 mt-4">Login</button>
        </fieldset>

        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Login;
