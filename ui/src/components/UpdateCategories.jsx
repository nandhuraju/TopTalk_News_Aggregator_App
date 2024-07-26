import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/user/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories);
          setSelectedCategories(data.selectedCategories);
        } else {
          setError("Error fetching categories");
        }
      } catch (err) {
        setError(`Error fetching categories: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const res = await fetch("/api/user/updatecategories", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories: selectedCategories }),
      });

      if (res.ok) {
        toast.success("Categories updated successfully");
        navigate("/home"); 
      } else {
        setError("Error updating categories");
      }
    } catch (err) {
      setError(`Error updating categories: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded mt-11">
      <h2 className="text-2xl font-bold mb-4">Update Categories</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Categories</label>
          <div>
            {categories.map((category) => (
              <label key={category} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCheckboxChange}
                  className="form-checkbox"
                />
                <span className="ml-2 capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Update Categories
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategories;
