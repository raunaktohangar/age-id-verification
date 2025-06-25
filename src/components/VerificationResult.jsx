import React from 'react';

const VerificationResult = ({ extractedDOB, confidence }) => {
  const getAge = (dob) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(extractedDOB);
  const isVerified = confidence >= 70 && age >= 18;

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">
        <div className={`text-4xl mb-4 ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
          {isVerified ? '✅' : '❌'}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {isVerified ? 'Verification Successful' : 'Verification Failed'}
        </h2>

        <p className="text-gray-500 mb-6">
          {isVerified
            ? 'ID and age verification passed successfully.'
            : 'Verification could not be completed. Please recheck your inputs.'}
        </p>

        <div className="text-left text-sm text-gray-700 space-y-2 mb-6">
          <div className="flex justify-between">
            <span>Extracted DOB</span>
            <span>{extractedDOB || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span>Age</span>
            <span>{age} years</span>
          </div>
          <div className="flex justify-between">
            <span>Confidence</span>
            <span>{confidence}%</span>
          </div>
          <div className="flex justify-between">
            <span>Age Status</span>
            <span>{age >= 18 ? '18+ Verified' : 'Underage'}</span>
          </div>
        </div>

        <button
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            isVerified ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-500 text-white hover:bg-red-600'
          }`}
          onClick={() => window.location.reload()}
        >
          {isVerified ? 'Continue' : 'Retry'}
        </button>

        <p className="text-xs text-gray-400 mt-4">
          {isVerified ? 'Secure verification passed.' : 'Please try again with valid documents.'}
        </p>
      </div>
    </div>
  );
};

export default VerificationResult;

