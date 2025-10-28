import React from "react";
import Form from "../components/Form";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiHelper from "../apiHelper";
import { setCredentials } from "../features/auth/authSlice";


export default function SignUp() {
   const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      
      const res = await apiHelper.post("auth/signup", data, {
        auth: false,   
        notify: true,  
      });

      if (!res) return;
     
      dispatch(setCredentials(res));
      
      navigate("/customer-dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message || "This field is required");
    });
  };
  return (
    <div className="px-16 flex flex-col min-h-screen w-full items-center justify-center py-28 md:px-32 text-white ">
      <div
        className="flex flex-col items-center justify-center gap-10 
                bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-6"
      >
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          header="Sign Up"
          buttonName="Sign Up"
        >
          <InputField
            label="Username"
            name="username"
            register={register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9_ ]+$/,
                message: "Invalid username format",
              },
            })}
          />

          <InputField
            label="Email"
            name="email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />

          <InputField
            label="Phone"
            name="phone"
            register={register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />

          <InputField
            label="Address"
            name="address"
            register={register("address", {
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters long",
              },
            })}
          />
        </Form>
      </div>
    </div>
  );
}
