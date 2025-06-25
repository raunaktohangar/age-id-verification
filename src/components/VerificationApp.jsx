//updated code
import React, { useState } from 'react';
import { useEffect } from 'react';
import VerificationResult from './VerificationResult';
import FileUpload from './FileUpload';
import SelfieCapture from './SelfieCapture';

function VerificationApp() {
  const [aadharImage, setAadharImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [dob, setDOB] = useState('');
  const [confidence, setConfidence] = useState(null);

  //https request
  useEffect(() => {
    if (aadharImage && selfieImage) {
      fetch('http://localhost:5000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadharImage: aadharImage,
          selfieImage: selfieImage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setDOB(data.extractedDOB);
          setConfidence(data.confidence);
        })
        .catch((err) => console.error('API Error:', err));
    }
  }, [aadharImage, selfieImage]); // Ye tab chale jab dono images mil jayein


  const handleAadharUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setAadharImage(imgURL);

      // Simulate DOB extraction and confidence from Aadhar
      setDOB('2000-01-01'); // later will be extracted via OCR
      setConfidence(Math.floor(Math.random() * 50) + 50); // 50–100%
    }
  };

  const handleSelfieCapture = (imgData) => {
    setSelfieImage(imgData);

    // Update confidence after matching (simulated)
    setConfidence(Math.floor(Math.random() * 50) + 50);
  };

  return (
    
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-10 flex items-center justify-center"
      style={{
        backgroundImage: "url('/download.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
      }}
    >
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 w-full max-w-6xl grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Aadhar Upload */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Aadhar</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-white hover:bg-gray-100 transition">
              <svg
                className="w-10 h-10 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0L8 12m4-4l4 4m1 5a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h5" />
              </svg>
              <p className="text-sm text-gray-500 mb-2">
                Drag & drop or select your <span className="font-medium">Aadhar image</span>
              </p>
              <p className="text-xs text-gray-400 mb-4">PNG, JPG up to 5MB</p>
              <FileUpload label="Browse File" onChange={handleAadharUpload} />
            </div>
          </div>

          {/* Selfie Capture */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Capture Selfie</h2>
            <SelfieCapture onCapture={handleSelfieCapture} />
            <p className="text-sm text-gray-500 mt-2">Allow camera access to proceed</p>
          </div>
        </div>

        {/* Right: Static Vertical Reference Image */}
        <div className="flex items-center justify-center">
          <img
            src="/download.jpeg"
            alt="Reference Aadhar"
            className="rounded-xl shadow-lg object-contain h-[400px] w-auto"
          />
        </div>
      </div>

      {/* Verification Result Section */}
      {aadharImage && selfieImage && (
        <div className="w-full max-w-4xl mt-10 z-10">
          <VerificationResult
            extractedDOB={dob}
            confidence={confidence}
          />
        </div>
      )}
    </div>
  );
}

export default VerificationApp;



