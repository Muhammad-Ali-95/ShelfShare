 "use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import axios from "axios"; // Removed for Vercel Frontend deployment

export default function ExchangeBook() {
  const router = useRouter();
  
  // --- STATE ---
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]); // Empty list, no dummy books added
  const [loading, setLoading] = useState(true);
  
  // 🔔 Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // --- 1. CHECK LOGIN STATUS ON LOAD ---
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("shelfshare_user");
      const token = localStorage.getItem("shelfshare_token");
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // --- 2. FETCH BOOKS (Modified for Vercel) ---
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Backend fetch removed to prevent "Network Error" on Vercel
        // The books list will remain empty.
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // --- 🔔 HELPER: SHOW TOAST ---
  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    // Hide after 3 seconds
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // --- 3. SMART LOGOUT ---
  const handleLogout = () => {
    if (!user) {
      showToast("You are not logged in!", "error");
      return;
    }
    
    // Perform Logout
    setUser(null);
    localStorage.removeItem("shelfshare_user");
    localStorage.removeItem("shelfshare_token");
    
    showToast("Logged out successfully.", "success");
    
    // Redirect after a moment
    setTimeout(() => router.push("/login"), 1500);
  };

  // --- 4. SMART ADD BOOK CLICK ---
// --- NEW CODE (Direct Access) ---
const handleAddBookClick = () => {
  // Directly go to the Add Book page without checking for a token
  router.push("/add-book");
};

  return (
    <main className="min-h-screen bg-gray-50 relative">
      
      {/* 🔔 TOAST NOTIFICATION BOX (Fixed at top) */}
      {toast.show && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition-all duration-500 ease-in-out ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast.message}
        </div>
      )}

      {/* Navbar (Kept exactly as requested) */}
      <nav className="sticky top-0 z-40 bg-white shadow-md flex justify-between items-center px-6 py-3">
        <h2 className="text-green-700 font-bold text-xl">Exchange Books</h2>
        <div className="flex gap-3 items-center">
          <Link href="/dashboard" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition">
            Dashboard
          </Link>
          
          {/* Smart Add Button */}
          <button 
            onClick={handleAddBookClick}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition"
          >
            Add Book
          </button>

          {/* Smart Login/Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-100 to-white py-12 mt-4">
        <div className="container mx-auto px-4">
          <div className="rounded-lg p-8 bg-white shadow">
            <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
              ShelfShare — Exchange & Share Books
            </h1>
            <p className="text-gray-700">Browse and connect with other users’ book listings.</p>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Exchange Listings</h2>
        {loading ? (
           <p className="text-gray-500">Loading community books...</p>
        ) : books.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-gray-600">
            No listings yet — be the first to add a book!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((b) => (
              <div key={b._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center relative">
                  {b.photo ? (
                    <img src={b.photo} alt={b.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}
                  <span className="absolute bottom-2 right-2 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded">
                    Rs. {b.price}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">{b.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{b.author}</p>
                  <Link 
                    href={`/book/${b._id}`} 
                    className="block mt-4 text-center w-full bg-green-700 text-white py-2 rounded text-sm hover:bg-green-800 transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}