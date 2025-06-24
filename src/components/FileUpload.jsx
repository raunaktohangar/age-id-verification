import React from 'react';

const FileUpload = ({ label, onChange }) => {
  return (
    <div className="p-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 hover:file:bg-blue-200"
      />
    </div>
  );
};

export default FileUpload;
