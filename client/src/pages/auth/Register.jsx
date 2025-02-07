import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert("Confirm Password is not match!!");
    }
    console.log(form);

    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      console.log(res);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div>
      Register
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
        Confirm Password
        <input
          className="border"
          type="text"
          name="confirmPassword"
          onChange={handleOnChange}
        />
        <button className="bg-blue-500 rounded-md">Register</button>
      </form>
    </div>
  );
};

export default Register;
