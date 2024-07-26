import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { jwtDecode } from "jwt-decode";
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
        setUserType(decodedToken.userType);
        setUsername(decodedToken.username || "");
      } catch (error) {
        console.error("Failed to decode token:", error);
        // Handle error, such as removing the token or redirecting the user
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
    <div className="flex justify-between bg-green-300 shadow-md h-20 ">
      <div className="flex my-auto ml-2">
        <SiGoogleearth size={40} color="green" />
        <Link
          to="/home"
          className="text-4xl hover:text-lime-700 font-extrabold text-lime-600 ml-3 "
        >
          TopTalk
        </Link>
      </div>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search News..."
          className="px-4 py-2 rounded shadow"
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

      <div className="flex items-center">
        <div className="flex items-center  mr-3">
          {username && (
            <span className=" text-lime-600 font-semibold flex ">
              <FaUser size={18} color="green" />
              {username}
            </span>
          )}
        </div>
        <div className="flex items-center">
          <AiFillHome size={22} color="green" />
          <Link
            to="/home"
            className="text-lime-600 hover:text-lime-700 px-3 py-2 text-base font-semibold"
          >
            Home
          </Link>
        </div>
        <div className="flex items-center">
          <IoBookmarks size={18} color="green" />
          <Link
            to="/bookmarks"
            className="text-lime-600 hover:text-lime-700 px-3 py-2 text-base font-semibold"
          >
            Bookmarks
          </Link>
        </div>
        <div className="flex items-center">
          <BiSolidCategoryAlt size={20} color="green" />
          <Link
            to="/categories"
            className="text-lime-600 hover:text-lime-700 px-3 py-2 text-base font-semibold"
          >
            Categories
          </Link>
        </div>
        <div className="flex items-center">
          <MdPlaylistAdd size={25} color="green" />{" "}
          {userType === "admin" && (
            <Link
              to="/addnews"
              className="text-lime-600 hover:text-lime-700 px-3 py-2 text-base font-semibold "
            >
              Add News
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <IoLogOut size={22} color="green" />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
