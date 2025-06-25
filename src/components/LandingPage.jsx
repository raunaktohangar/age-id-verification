import React from 'react';

const LandingPage = () => {
  // Smooth scroll to #about section
  const handleGetStarted = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-blue-200 text-gray-800 relative overflow-x-hidden">{/* Decorative SVG background */}
      <svg className="absolute left-0 top-0 w-full h-64 opacity-20 pointer-events-none" viewBox="0 0 1440 320">
        <path fill="#fff" fillOpacity="0.2" d="M0,160L80,170.7C160,181,320,203,480,186.7C640,171,800,117,960,122.7C1120,128,1280,192,1360,224L1440,256V0H1360C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0H0Z"></path>
      </svg>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center relative z-10">
        <div className="backdrop-blur-md bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full mx-auto border border-white/30">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            FaceTag
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto drop-shadow-sm mb-6">
            A secure way to verify age and identity using simulated Aadhar cards and live selfies.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-pink-600 transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white text-gray-800 py-20 px-6 md:px-20" id="about">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl transition">
            {/* Upload Icon */}
            <svg className="w-12 h-12 mb-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <h3 className="font-semibold text-xl mb-2">Step 1</h3>
            <p>Upload Aadhar card image.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl transition">
            {/* Camera Icon */}
            <svg className="w-12 h-12 mb-4 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <h3 className="font-semibold text-xl mb-2">Step 2</h3>
            <p>Capture a live selfie using your device camera.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl transition">
            {/* Check Badge Icon */}
            <svg className="w-12 h-12 mb-4 text-pink-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <h3 className="font-semibold text-xl mb-2">Step 3</h3>
            <p>We’ll compare both and verify age (18+) and identity match.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-pink-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Ready to Verify?</h2>
        <p className="text-lg mb-8">Click below to begin your verification journey.</p>
        <a
          href="/app"
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 hover:text-pink-600 transition-all duration-200"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default LandingPage;