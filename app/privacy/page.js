"use client";
import React from "react";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-green-50 py-16 px-8">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Privacy Notice</h1>
        <p className="max-w-2xl mx-auto text-gray-700">
          Your privacy is important to us. This page explains how we collect, use, and protect your information on ShelfShare.
        </p>
      </section>

      {/* Privacy Sections */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Information We Collect</h2>
          <p className="text-gray-600">
            We collect personal information such as your name, email address, and account activity when you register or use ShelfShare.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">How We Use Your Information</h2>
          <p className="text-gray-600">
            We use your information to provide services, improve user experience, and communicate important updates or notifications.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Sharing Your Information</h2>
          <p className="text-gray-600">
            We do not sell or share your personal information with third parties except when required by law or to provide the services you requested.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Data Security</h2>
          <p className="text-gray-600">
            We implement reasonable measures to protect your information, but please note that no online service can guarantee 100% security.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Your Rights</h2>
          <p className="text-gray-600">
            You can access, update, or delete your personal information at any time through your account settings.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Privacy;