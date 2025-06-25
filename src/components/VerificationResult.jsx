import React from 'react';

const VerificationResult = ({ age, confidence, age_verified, onRetry, match}) => {
  const isVerified = age_verified && age >= 18 && confidence >= 70;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-300 to-blue-200 px-2">
      {/* Top Shield Icon and Heading */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-[#6c63ff] rounded-full p-3 mb-2">
          {/* Shield Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V7l7-4z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Identity Verification Results</h1>
        <p className="text-gray-500 mt-1">ID and age verification process complete</p>
      </div>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-100">
        {/* Large Check or Cross */}
        <div className="flex flex-col items-center mb-4">
          {isVerified ? (
            <div className="bg-green-100 rounded-full p-4 mb-2">
              {/* Check Circle Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" />
              </svg>
            </div>
          ) : (
            <div className="bg-red-100 rounded-full p-4 mb-2">
              {/* Cross Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9l-6 6m0-6l6 6" />
              </svg>
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {isVerified ? 'Verification Successful' : 'Verification Failed'}
        </h2>
        <p className="text-gray-500 mb-6">
          {isVerified
            ? `The person has been verified as 18+ years of age.`
            : 'Verification could not be completed. Please recheck your inputs.'}
        </p>

        {/* Status Rows */}
        <div className="bg-gray-50 rounded-xl py-4 px-2 mb-6 space-y-3">
          <div className="flex justify-between items-center px-4">
            <span className="text-gray-600 font-medium">Identity Match</span>
            <span className={`font-semibold flex items-center gap-1 ${match ? 'text-green-600' : 'text-red-500'}`}>
              {match===true || match === "true" ? 'Confirmed' : 'Not Matched'}
              {match===true || match === "true" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center px-4">
            <span className="text-gray-600 font-medium">Age Requirement</span>
            <span className={`font-semibold flex items-center gap-1 ${age_verified && age >= 18 ? 'text-green-600' : 'text-red-500'}`}>
              {age_verified && age >= 18 ? '18+ Verified' : 'Underage'}
              {age_verified && age >= 18 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center px-4">
            <span className="text-gray-600 font-medium">Confidence</span>
            <span className={`font-semibold flex items-center gap-1 ${confidence >= 70 ? 'text-green-600' : 'text-red-500'}`}>
              {confidence ? `${confidence.toFixed(2)}%` : 'N/A'}
              {confidence >= 70 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </span>
          </div>
        </div>

        {/* Continue/Retry Button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold text-white text-base transition ${
            isVerified ? 'bg-[#6c63ff] hover:bg-[#554ee2]' : 'bg-red-500 hover:bg-red-600'
          }`}
          onClick={() => {
            if (onRetry) onRetry();
            else window.location.reload();
          }}
        >
          {isVerified ? 'Continue' : 'Retry'}
        </button>
      </div>
      {/* Footer */}
      <p className="text-xs text-gray-400 mt-6">
        Secure verification powered by ID Verify System
      </p>
    </div>
  );
};

export default VerificationResult;