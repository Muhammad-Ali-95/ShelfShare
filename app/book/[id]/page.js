"use client";
// src/pages/BookDetails.jsx
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]); // Store reviews
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // 1. Load User
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("shelfshare_user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("User parsing error", e);
    }
  }, []);

  // 2. Fetch Book & Reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Book
        const bookRes = await axios.get(`http://localhost:8080/api/books/${id}`);
        if (bookRes.data.success) {
          setBook(bookRes.data.book);
        }

        // Fetch Reviews (Create this endpoint in backend if not exists)
        const reviewRes = await axios.get(`http://localhost:8080/api/reviews/${id}`);
        if (reviewRes.data.success) {
          setReviews(reviewRes.data.reviews);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 3. Handle Delete Listing
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      const token = localStorage.getItem("shelfshare_token");
      const res = await axios.delete(`http://localhost:8080/api/books/${id}`, {
        headers: { Authorization: token }
      });
      
      if (res.data.success) {
        alert("Listing deleted successfully.");
        navigate("/bookexchange");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Error deleting book.");
    }
  };

  // 4. Handle Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Please write a comment.");

    const token = localStorage.getItem("shelfshare_token");
    if (!token) return alert("Please login to review.");

    try {
      const res = await axios.post(`http://localhost:8080/api/reviews/${id}`, {
        rating,
        comment
      }, {
        headers: { Authorization: token }
      });

      if (res.data.success) {
        // Add new review to list immediately (Optimistic UI)
        const newReview = {
          ...res.data.review,
          userId: { name: currentUser.name } // Mock name for immediate display
        };
        setReviews([newReview, ...reviews]);
        setComment(""); // Clear form
        alert("Review submitted!");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!book) return <div className="text-center py-20">Book not found.</div>;

  // 🔥 CHECK OWNERSHIP (Robust Check)
  // Check if currentUser._id matches book.addedBy._id
  const isOwner = currentUser && book.addedBy && (currentUser._id === book.addedBy._id || currentUser.id === book.addedBy._id);

  return (
    <main className="min-h-screen bg-green-50 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* --- BOOK INFO SECTION --- */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-10">
          {/* Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
            {book.photo ? (
              <img src={book.photo} alt={book.title} className="max-h-96 object-contain shadow-md" />
            ) : (
              <div className="text-gray-400">No Image Available</div>
            )}
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
                  {book.condition}
                </span>
              </div>
              <p className="text-lg text-gray-600 mt-2 font-medium">by {book.author}</p>
              <p className="text-sm text-gray-500 mt-1">Genre: {book.genre} | Location: {book.location}</p>
              
              <div className="my-6">
                <h3 className="text-green-700 font-bold text-4xl">Rs. {book.price}</h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{book.description}</p>
              </div>
              
              <p className="text-xs text-gray-400 mt-4">
                Listed by: <span className="font-bold">{book.addedBy?.name || "Unknown"}</span>
              </p>
            </div>

            {/* Owner Buttons */}
            <div className="mt-8 flex gap-4">
              {isOwner ? (
                <>
                  <button 
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition shadow"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition shadow"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => alert(`Contact: ${book.addedBy?.email}`)}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg transition shadow"
                >
                  Contact Seller
                </button>
              )}
            </div>
          </div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Reviews & Comments</h3>
          
          {/* Review Form */}
          <div className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-4">Leave a Review</h4>
            {currentUser ? (
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                   <label className="block text-sm text-gray-600 mb-1">Rating</label>
                   <select 
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)}
                      className="border p-2 rounded w-full max-w-xs bg-white"
                   >
                     <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                     <option value="4">⭐⭐⭐⭐ (Good)</option>
                     <option value="3">⭐⭐⭐ (Average)</option>
                     <option value="2">⭐⭐ (Fair)</option>
                     <option value="1">⭐ (Poor)</option>
                   </select>
                </div>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:outline-green-600 mb-3" 
                  rows="3"
                  placeholder="Share your experience..."
                  required
                ></textarea>
                <button className="bg-green-700 text-white px-6 py-2 rounded font-bold hover:bg-green-800 transition">
                  Submit Review
                </button>
              </form>
            ) : (
              <p className="text-gray-500 italic">Please <a href="/login" className="text-green-700 underline">login</a> to leave a review.</p>
            )}
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
            ) : (
              reviews.map((rev, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold text-gray-800">{rev.userId?.name || "Anonymous"}</h5>
                    <span className="text-yellow-500 text-sm">
                      {"⭐".repeat(rev.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{rev.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </main>
  );
}