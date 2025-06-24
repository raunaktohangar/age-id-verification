import React, { useState } from 'react';
import FileUpload from './FileUpload';
import SelfieCapture from './SelfieCapture';
import ResultCard from './ResultCard';

function VerificationApp() {
  const [aadharImage, setAadharImage] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [dob, setDOB] = useState('1999-10-15'); // Simulated
  const [confidence, setConfidence] = useState(null);

  const handleAadharUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setAadharImage(imgURL);

      // Simulate OCR & face extraction
      setDOB('2000-01-01'); // Replace with Tesseract OCR later
      setConfidence(Math.floor(Math.random() * 50) + 50); // Simulate 50-100%
    }
  };

  const handleSelfieCapture = (imgData) => {
    setSelfieImage(imgData);
    // Simulate confidence re-calc
    setConfidence(Math.floor(Math.random() * 50) + 50);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Age & Identity Verification System
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <FileUpload label="Upload Aadhar Image" onChange={handleAadharUpload} />
        <SelfieCapture onCapture={handleSelfieCapture} />
      </div>
      {aadharImage && selfieImage && (
        <div className="mt-6">
          <ResultCard
            extractedDOB={dob}
            confidence={confidence}
            selfieImg={selfieImage}
            docImg={aadharImage}
          />
        </div>
      )}
    </div>
  );
}

export default VerificationApp;
