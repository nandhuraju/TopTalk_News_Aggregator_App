import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import {jwtDecode }from "jwt-decode";
import { FaUser } from "react-icons/fa";
import { SiGoogleearth } from "react-icons/si";
import { IoBookmarks } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { MdPlaylistAdd } from "react-icons/md";

const Navbar = () => {
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType); // Extracts userType from token
        setUsername(decodedToken.username || ""); // Extracts username from token
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Handle token decoding errors
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="flex justify-between items-center bg-green-300 shadow-md h-20 px-4">
      {/* Left section - Logo */}
      <div className="flex items-center">
        <SiGoogleearth size={40} color="green" />
        <Link
          to="/home"
          className="text-4xl hover:text-lime-700 font-extrabold text-lime-600 ml-3"
        >
          TopTalk
        </Link>
      </div>

      {/* Center section - Search */}
      <div className="flex items-center flex-grow mx-4">
        <input
          type="text"
          placeholder="Search News..."
          className="flex-grow px-4 py-2 rounded shadow text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-lime-600 text-white rounded shadow hover:bg-lime-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Right section - User Info and Links */}
      <div className="flex items-center space-x-4">
        {/* Username and Role */}
        {username && (
          <span className="text-lime-600 font-semibold flex items-center">
            <FaUser size={18} color="green" className="mr-1" />
            {username}{" "}
            <span className="ml-2 text-sm text-gray-700">({userType})</span>
          </span>
        )}

        {/* Navigation Links */}
        <Link
          to="/home"
          className="text-lime-600 hover:text-lime-700 flex items-center text-base font-semibold"
        >
          <AiFillHome size={22} className="mr-1" />
          Home
        </Link>

        <Link
          to="/bookmarks"
          className="text-lime-600 hover:text-lime-700 flex items-center text-base font-semibold"
        >
          <IoBookmarks size={18} className="mr-1" />
          Bookmarks
        </Link>

        <Link
          to="/categories"
          className="text-lime-600 hover:text-lime-700 flex items-center text-base font-semibold"
        >
          <BiSolidCategoryAlt size={20} className="mr-1" />
          Categories
        </Link>

        {/* Admin-only Links */}
        {userType === "admin" && (
          <Link
            to="/addnews"
            className="text-lime-600 hover:text-lime-700 flex items-center text-base font-semibold"
          >
            <MdPlaylistAdd size={22} className="mr-1" />
            Add News
          </Link>
        )}

        {/* Logout */}
        <Logout className="text-lime-600 hover:text-lime-700 flex items-center text-base font-semibold" />
      </div>
    </div>
  );
};

export default Navbar;
