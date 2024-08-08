import React, { useEffect, useState } from "react";
import { validPassword, validEmail } from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../APICALLS/user"; // Ensure this is correctly implemented
import { message } from "antd";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" }); // Clear error when user types in the input
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    const emailError = validEmail(formData.email);
    const passwordError = validPassword(formData.password);
  
    const newErrors = {};
    if (emailError) {
      newErrors.email = emailError;
    }
    if (passwordError) {
      newErrors.password = passwordError;
    }
  
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
  
    try {
      console.log("Submitting login form with data:", formData);
      const response = await loginUser(formData);
      console.log("API response:", response);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        navigate('/home');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pb-8 pt-12">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label htmlFor="email" className="text-gray-700 text-sm font-bold mr-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
            />
            {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="password" className="text-gray-700 text-sm font-bold mr-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 w-full"
            />
            {error.password && <span className="text-red-500 text-sm">{error.password}</span>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center">
            <Link to="/">
              <button type="button" className="text-blue-500">Not Registered????</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
