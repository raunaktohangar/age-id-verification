import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mb-4">
          Age & Identity Verification System
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto drop-shadow-sm">
          A secure way to verify age and identity using simulated Aadhar cards and live selfies.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
          className="mt-6 bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </div>

      {/* About Section */}
      <div className="bg-white text-gray-800 py-16 px-6 md:px-20" id="about">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2">Step 1</h3>
            <p>Upload a simulated Aadhar card image or PDF.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2">Step 2</h3>
            <p>Capture a live selfie using your device camera.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-xl mb-2">Step 3</h3>
            <p>We’ll compare both and verify age (18+) and identity match.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Verify?</h2>
        <p className="text-lg mb-6">Click below to begin your verification journey.</p>
        <a href="/app" className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200">
          Launch App
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
