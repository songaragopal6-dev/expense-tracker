import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router";
import axios from 'axios'
import Dashboard from "../Screens/Dashboard";


const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false)
  const [login,setLogin]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisable(true)
      const response = await axios.post("http://localhost:3000/login", form );
      console.log(response.data);

      const {token } = response.data
      localStorage.setItem("userToken",token)

    setLogin(true)
    
    } catch (error) {
      console.log(error);
      setDisable(false);
    }
  };

  if (login) {
    return <Dashboard />;
  }

  return (
    <>
      <div className="Body">
        <div className="loginBody">
          <div className="welcomeTag">Welcome Back!!</div> 
          <p className="TagLine">Track your personal expenses in </p>

          <form action="" method="post" onSubmit={handleSubmit}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  email: e.target.value,
                }));
              }}
              placeholder="Enter your  email"
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  password: e.target.value,
                }));
              }}
              placeholder="Enter Password"
            />

            <div className="register">
              Don't have Account? <Link to="/register">Register</Link>
            </div>
            <button type={"submit"} disabled={disable} > {disable? 'Loading......' : "Login"}  </button>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
