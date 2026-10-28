import React from "react";
import "./Login.css";
import { Link } from "react-router";
import Login from "./Login";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [loading , setLoading]=useState(false)
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name,value} =e.target
    setform({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
setLoading(false)
    try {
      const response = await axios.post("http://localhost:3000/register", form);
      console.log(response.data);
    } catch (error) 
    {
      console.log("Facing problem while submitting data");
    }
  };
  return (
    <>
      <div className="Body">
        <div className="loginBody">
          <div className="welcomeTag">Welcome To Expense Tracker!!</div>
          <p className="TagLine">Track your personal expenses in Easy way </p>

          <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="">Name</label>
            <input
              type="text "
              name="name"
              placeholder="Enter your Name "
              onChange={handleChange}
            />
            <label htmlFor="">Email</label>
            <input
              type="text "
              name="email"
              placeholder="Enter your Email"
              onChange={handleChange}
            />
            <label htmlFor="">Password</label>
            <input
              type="text "
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
            />
            <div className="register">
              {" "}
              Already have Account? <Link to={"/"}> Login</Link>
            </div>
            <button type="submit" disabled={loading} > {loading ? "Processing": "Register"}  </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
