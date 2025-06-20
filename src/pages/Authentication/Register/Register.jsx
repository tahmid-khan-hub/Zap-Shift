import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
     formState: {errors}
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
    <h2 className="text-3xl mb-11">Create An Account here</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
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

          <p className="text-lg text-lime-500 font-semibold"><Link to='/login'>Click here for login</Link></p>

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
