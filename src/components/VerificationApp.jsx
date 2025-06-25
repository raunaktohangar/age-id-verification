import React, { useState } from 'react';
import FileUploadForm from './FileUpload'; // Your upload/capture component
import VerificationResult from './VerificationResult'; // The result component

function VerificationApp() {
  const [result, setResult] = useState(null);

  // Called by FileUploadForm after backend response
  const handleResult = (data) => {
    setResult({
      age: data.age,
    confidence: data.confidence,
    age_verified: data.age_verified,
    match: data.match,
    });
  };

  // Reset to allow retry
  const handleRetry = () => setResult(null);

  return (
    <>
      {!result ? (
        <FileUploadForm onResult={handleResult} />
      ) : (
        <VerificationResult
          age={result.age}
          confidence={result.confidence}
          age_verified={result.age_verified}
          match={result.match}
          onRetry={handleRetry}
        />
      )}
    </>
  );
}

export default VerificationApp;