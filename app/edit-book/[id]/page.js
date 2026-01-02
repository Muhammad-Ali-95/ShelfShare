"use client";
// src/pages/EditBook.jsx
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams(); // Get Book ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", author: "", price: "", genre: "",
    condition: "", location: "", desc: "",
  });
  
  const [currentPhoto, setCurrentPhoto] = useState(null); // To show existing photo
  const [imageFile, setImageFile] = useState(null);       // To store NEW photo
  const [imagePreview, setImagePreview] = useState(null); // To preview NEW photo

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/books/${id}`);
        if (res.data.success) {
          const b = res.data.book;
          // Pre-fill the form
          setForm({
            title: b.title,
            author: b.author,
            price: b.price,
            genre: b.genre,
            condition: b.condition,
            location: b.location,
            desc: b.description
          });
          setCurrentPhoto(b.photo);
        }
      } catch (err) {
        console.error("Error fetching book", err);
      }
    };
    fetchBook();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("shelfshare_token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("price", form.price);
    formData.append("genre", form.genre);
    formData.append("condition", form.condition);
    formData.append("location", form.location);
    formData.append("description", form.desc);
    
    // Only append photo if user selected a NEW one
    if (imageFile) {
      formData.append("photo", imageFile);
    }

    try {
      // 🔥 PUT Request to Update
      const response = await axios.put(`http://localhost:8080/api/books/${id}`, formData, {
        headers: { 
          Authorization: token,
          "Content-Type": "multipart/form-data"
        },
      });

      if (response.data.success) {
        alert("Book updated successfully!");
        navigate(`/book/${id}`); // Redirect back to Details Page
      }
    } catch (err) {
      console.error(err);
      alert("Error updating book.");
    }
  };

  return (
    <main className="min-h-screen bg-green-50 py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-green-100">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Edit Listing</h2>
        
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
            <select
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              className="w-full border p-2 rounded focus:outline-green-600 bg-white"
            >
              <option value="Fiction">Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Science">Science</option>
              <option value="Romance">Romance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              className="w-full border p-2 rounded focus:outline-green-600 bg-white"
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="w-full border p-2 rounded focus:outline-green-600"
              rows="3"
              required
            />
          </div>

          {/* Image Section */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Update Photo (Optional)</label>
            <input type="file" onChange={handleImageChange} className="mb-2 block w-full text-sm text-gray-500" />
            
            <div className="flex gap-4 mt-2">
              {/* Show New Preview if selected */}
              {imagePreview && (
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">New Image</p>
                  <img src={imagePreview} alt="New Preview" className="w-32 h-32 object-cover rounded shadow border" />
                </div>
              )}
              {/* Show Current Image if no new one selected */}
              {!imagePreview && currentPhoto && (
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Current Image</p>
                  <img src={currentPhoto} alt="Current" className="w-32 h-32 object-cover rounded shadow border opacity-75" />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex gap-3 mt-4">
            <button type="submit" className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold transition">
              Update Listing
            </button>
            <button
              type="button"
              onClick={() => navigate(`/book/${id}`)}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default EditBook;