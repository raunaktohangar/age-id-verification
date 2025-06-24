import React, { useRef } from 'react';

const SelfieCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const capturePhoto = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);
    const dataUrl = canvasRef.current.toDataURL();
    onCapture(dataUrl);
  };

  return (
    <div className="p-4">
      <button
        onClick={startCamera}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
      >
        Start Camera
      </button>
      <div>
        <video ref={videoRef} width="320" height="240" className="rounded shadow" />
        <canvas ref={canvasRef} width="320" height="240" hidden />
      </div>
      <button
        onClick={capturePhoto}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Capture Selfie
      </button>
    </div>
  );
};

export default SelfieCapture;
