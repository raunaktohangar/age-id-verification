import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import ruledImg from '../assets/rules.jpeg'; 
function FileUploadForm({ onResult }) {
  const [aadharFile, setAadharFile] = useState(null);
  const [selfieBlob, setSelfieBlob] = useState(null);
  const [selfieUrl, setSelfieUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleAadharChange = (e) => {
    setAadharFile(e.target.files[0]);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAadharFile(e.dataTransfer.files[0]);
    }
  };

  const captureSelfie = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        setSelfieBlob(blob);
        setSelfieUrl(imageSrc);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aadharFile || !selfieBlob) {
      alert('Please select Aadhar and capture a selfie.');
      return;
    }
    const formData = new FormData();
    formData.append('id_image', aadharFile);
    formData.append('selfie_image', selfieBlob, 'selfie.jpg');

    try {
      const response = await axios.post(
        import.meta.env.VITE_LOCALHOST_API_KEY,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log(response.data);
      if (onResult) onResult(response.data);
      alert('Upload successful!');
    } catch (error) {
      if (onResult) onResult({ error: true, message: error.message });
      alert('Upload failed!');
    }
  };

  // Rules for capturing selfie
  const selfieRules = [
    "Face the camera directly with a neutral expression.",
    "Ensure good lighting and avoid shadows.",
    "Remove glasses, hats, or masks.",
    "Background should be plain and light-colored.",
    "Make sure your face is clearly visible and not blurred.",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full justify-center bg-gradient-to-br from-blue-200 via-purple-300 to-blue-200  min-h-screen py-10 px-2 md:px-6">
      {/* Left: Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-blue-50 rounded-xl shadow-md p-6 flex flex-col gap-6"
      >
        <h2 className="text-xl font-semibold text-teal-900 mb-2">Submit Document</h2>
        {/* Upload Foto Section */}
        <div>
          <h3 className="text-lg font-semibold text-teal-800 mb-4">Upload ID</h3>
          <div
            className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 bg-gray-50 transition ${
              dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2">☁️</div>
              <div className="font-medium text-gray-700 mb-1">
                Drag &amp; Drop your <span className="text-teal-700">Image or file</span>
              </div>
              <div className="text-gray-500 text-sm mb-2">
                or{' '}
                <label className="text-teal-600 underline cursor-pointer">
                  browse file
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAadharChange}
                    className="hidden"
                  />
                </label>{' '}
                on your computer
              </div>
              <div className="flex justify-between w-full text-xs text-gray-400 mt-2">
                <span>Supported Formats: .png, .jpg, .jpeg   </span>
                <span>Maximum size: 20 MB</span>
              </div>
              {aadharFile && (
                <span className="text-green-600 text-xs mt-2 block">
                  {aadharFile.name} selected
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="flex items-center my-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* Capture photo Section */}
        <div>
          <h3 className="text-lg font-semibold text-teal-800 mb-4">Capture Photo</h3>
          <div className="bg-gray-50 rounded-xl flex flex-col items-center p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📷</span>
              <span className="font-medium text-gray-700">Give access to capture selfie</span>
              {!showWebcam && (
                <span
                  className="ml-2 text-xs text-teal-600 cursor-pointer underline"
                  onClick={() => setShowWebcam(true)}
                  role="button"
                  tabIndex={0}
                >
                  allow access
                </span>
              )}
            </div>
            {showWebcam && (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={220}
                  className="rounded-lg border"
                />
                <button
                  type="button"
                  onClick={captureSelfie}
                  className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  Click To Capture
                </button>
              </>
            )}
            {selfieUrl && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={selfieUrl}
                  alt="Selfie Preview"
                  className="w-24 h-24 rounded-full border-2 border-green-400 object-cover"
                />
                <span className="text-green-600 text-xs mt-2">Selfie captured!</span>
              </div>
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            &#8592; Back
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Upload
          </button>
        </div>
      </form>
      {/* Right: Selfie Rules */}
      <div className="w-full max-w-sm bg-blue-50 rounded-2xl shadow-lg p-8 flex flex-col gap-4 self-start">
        <h3 className="text-xl font-semibold text-teal-800 mb-2">Selfie Capture Rules</h3>
        <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
          {selfieRules.map((rule, idx) => (
            <li key={idx}>{rule}</li>
          ))}
        </ul>

        <img
    src={ruledImg} // <-- replace with your image path
    alt="Selfie Example"
    className="mt-8 rounded-xl border shadow object-cover w-full"
  />
      </div>
    </div>
  );
}

export default FileUploadForm;