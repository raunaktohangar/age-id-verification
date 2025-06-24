import React from 'react';

const ResultCard = ({ extractedDOB, confidence, selfieImg, docImg }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Verification Result</h2>
      <p><strong>Extracted DOB:</strong> {extractedDOB}</p>
      <p><strong>Age Status:</strong> {getAgeStatus(extractedDOB)}</p>
      <p><strong>Face Match Score:</strong> {confidence}%</p>
      <div className="flex gap-4 mt-4">
        <div>
          <p className="font-semibold">Selfie</p>
          <img src={selfieImg} alt="Selfie" className="w-32 h-32 rounded shadow" />
        </div>
        <div>
          <p className="font-semibold">Document Photo</p>
          <img src={docImg} alt="Aadhar" className="w-32 h-32 rounded shadow" />
        </div>
      </div>
    </div>
  );
};

const getAgeStatus = (dob) => {
  if (!dob) return 'Unknown';
  const birthDate = new Date(dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();
  return age >= 18 ? '✅ 18+ Verified' : '❌ Underage';
};

export default ResultCard;
