import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { email, password };

    try {
      const res = await axios.post('/api/auth/login', loginDetails);
      if (res.status === 200) {
        const data = res.data;
        const userType = data.userType;
        toast.success(`Logged in as: ${userType}`);

        
        localStorage.setItem('token', data.token);

        // Fetch user information
        const userRes = await axios.get('/api/user/categories', {
          headers: { Authorization: `Bearer ${data.token}` }
        });
        const userData = userRes.data;
        const categories = userData.categories;

        // Navigate to home with categories
        navigate('/home', { state: { categories } });
      } else {
        toast.error('Please check your credentials');
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">Login</h2>
      <form onSubmit={loginSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Login</button>
          
        </div>
        <p className="text-center">Don't have an account? <Link to="/sign-up" className="text-green-700 hover:underline">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
