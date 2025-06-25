import React, { useState } from 'react';
import FileUploadForm from './FileUpload'; // Use the new form

function VerificationApp() {
  const [result, setResult] = useState(null);

  // Callback to handle server response
  const handleResult = (data) => {
    setResult(data);
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
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Aadhar & Selfie Verification</h2>
        <FileUploadForm onResult={handleResult} />
        {result && (
          <div className="mt-8 w-full max-w-4xl">
            {/* Render your result here, or use your ResultCard if you want */}
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerificationApp;