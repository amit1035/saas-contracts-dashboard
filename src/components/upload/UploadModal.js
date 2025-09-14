import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { formatFileSize, isSupportedDocument } from '../../utils/helpers';

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files);
    const validFiles = newFiles.filter(file => isSupportedDocument(file.name));
    
    const updatedFiles = [
      ...files,
      ...validFiles.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        status: 'Uploading'
      }))
    ];
    
    setFiles(updatedFiles);
    
    // Simulate upload process
    setTimeout(() => {
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.status === 'Uploading' 
            ? { ...f, status: Math.random() > 0.2 ? 'Success' : 'Error' } 
            : f
        )
      );
    }, 2000);
  };
  
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => isSupportedDocument(file.name));
    
    const updatedFiles = [
      ...files,
      ...validFiles.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        status: 'Uploading'
      }))
    ];
    
    setFiles(updatedFiles);
    
    // Simulate upload process
    setTimeout(() => {
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.status === 'Uploading' 
            ? { ...f, status: Math.random() > 0.2 ? 'Success' : 'Error' } 
            : f
        )
      );
    }, 2000);
  };
  
  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'text-green-600';
      case 'Error': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success': return '✓';
      case 'Error': return '✗';
      default: return '⏳';
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Upload Contract</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>
          
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <div className="text-blue-500 text-5xl mb-4">📁</div>
            <p className="text-gray-700 font-medium mb-2">Drag and drop your contract here</p>
            <p className="text-gray-500 mb-4">or</p>
            <Button variant="primary" className="mb-2">
              Browse Files
            </Button>
            <input 
              id="file-upload"
              type="file" 
              className="hidden" 
              multiple 
              onChange={handleFileSelect}
            />
            <p className="text-gray-500 text-sm">Supported formats: PDF, DOC, DOCX</p>
          </div>
          
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="text-blue-500 text-xl mr-3">📄</div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">{file.name}</div>
                        <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-sm mr-3 ${getStatusColor(file.status)}`}>
                        {getStatusIcon(file.status)} {file.status}
                      </span>
                      <button 
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button variant="ghost" onClick={onClose} className="order-2 sm:order-1">
              Cancel
            </Button>
            <Button variant="primary" className="order-1 sm:order-2">
              Complete Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

UploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UploadModal;