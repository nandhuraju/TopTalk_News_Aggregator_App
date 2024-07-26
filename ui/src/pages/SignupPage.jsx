import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (categories.includes(value)) {
      setCategories(categories.filter((category) => category !== value));
    } else {
      setCategories([...categories, value]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        password,
        email,
        userType,
        categories,
      });
      if (response.data.message === "User registered successfully") {
        navigate("/login");
        toast.success("SignUp Success")
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded mt-4">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
            placeholder="Enter full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
            placeholder="Minimum 8 characters required"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select user type
            </option>
            <option value="admin">Admin</option>
            <option value="subscriber">Subscriber</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Categories</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="sports"
                checked={categories.includes("sports")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Sports</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="entertainment"
                checked={categories.includes("entertainment")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Entertainment</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="technology"
                checked={categories.includes("technology")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Technology</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="health"
                checked={categories.includes("health")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Health</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="science"
                checked={categories.includes("science")}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="ml-2">Science</span>
            </label>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
