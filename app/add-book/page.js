 "use client";
// src/pages/AddBook.jsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

const AddBook = () => {
  const router = useRouter(); 

  // --- 1. REMOVED SECURITY GUARD (Requirement #3: Pages must be accessible) ---
  // We no longer check for a token or redirect to login on load.

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    genre: "Fiction",
    condition: "Good",
    location: "",
    desc: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    // --- 2. SIMULATED SUBMISSION (Frontend Only) ---
    // Instead of calling fetch(), we just pretend it worked.
    
    // Optional: Log the data to console to show it "captured" the input
    console.log("Form Data Submitted (Demo):", form);
    
    alert("Book added successfully! (Demo Mode: No database connected)");

    // Clear form
    setForm({
      title: "",
      author: "",
      price: "",
      genre: "Fiction",
      condition: "Good",
      location: "",
      desc: "",
    });
    setImageFile(null);
    setImagePreview(null);

    // Redirect to Dashboard
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-green-50 py-8 flex items-center justify-center">
      {/* Simple Navbar for Navigation back home */}
      {/* <nav className="fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
         <h1 className="text-xl font-bold text-green-700">ShelfShare</h1>
         <Link href="/dashboard" className="text-gray-600 hover:text-green-700">Back to Dashboard</Link>
      </nav> */}

      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-green-100 mt-16">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          List a Book
        </h2>

        <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. The Great Gatsby"
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Author Name"
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Rs.)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="1500"
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
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

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
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

          {/* Location */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City / Location
            </label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Lahore, DHA Phase 5"
              className="w-full border p-2 rounded focus:outline-green-600"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="Short description of the book..."
              className="w-full border p-2 rounded focus:outline-green-600"
              rows="3"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-44 h-44 object-cover rounded shadow border mt-2"
              />
            ) : (
              <div className="w-44 h-44 bg-gray-100 flex items-center justify-center text-gray-400 rounded border mt-2">
                No image selected
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold transition"
            >
              Post Listing
            </button>
            <button
              type="button"
              onClick={() => {
                setForm({
                  title: "",
                  author: "",
                  price: "",
                  genre: "Fiction",
                  condition: "Good",
                  location: "",
                  desc: "",
                });
                setImageFile(null);
                setImagePreview(null);
              }}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddBook;