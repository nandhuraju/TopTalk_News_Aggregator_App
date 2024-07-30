import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      if (res.ok) {
        // Clear local storage
        localStorage.clear();
        toast.success("Logout success");
        navigate("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      className="text-lime-600 hover:text-lime-700 px-3 py-2 text-base font-semibold"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default Logout;
