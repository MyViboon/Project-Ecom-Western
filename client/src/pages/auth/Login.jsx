import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  console.log("User from Zustand", user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const rolrRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      rolrRedirect(role);
      toast.success("Welcome Back");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        Email
        <input
          className="border"
          type="email"
          name="email"
          onChange={handleOnChange}
        />
        Password
        <input
          className="border"
          type="text"
          name="password"
          onChange={handleOnChange}
        />
        <button className="bg-blue-500 rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;
