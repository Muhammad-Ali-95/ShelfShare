"use client";
import React from "react";

const Community = () => {
  return (
    <main className="min-h-screen bg-green-50">
      {/* Header */}
      <section className="h-[300px] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/book_community_picture.webp')",
        }}>
        <div className="bg-black/50 p-8 rounded-xl">
          <h1 className="text-4xl font-bold mb-4">Our Reading Community</h1>
          <p className="max-w-xl text-gray-200">
            Connect with readers, explore clubs, and share your journey.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Create a Community</h3>
          <p className="text-gray-600">Start your own book group and gather people around genres you love.</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Join Book Clubs</h3>
          <p className="text-gray-600">Find clubs that match your interests and read together.</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Share & Discuss</h3>
          <p className="text-gray-600">Exchange ideas, reviews, and recommendations with fellow readers.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center pb-20">
        <a
          href="/signup"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full text-lg shadow-md"
        >
          Join Now
        </a>
      </section>
    </main>
  );
};

export default Community;
