import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const EvidenceDrawer = ({ isOpen, onClose, evidence }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Evidence Details</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="space-y-6">
                    {evidence.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900">{item.source}</h3>
                        <p className="mt-2 text-sm text-gray-600">{item.snippet}</p>
                        <div className="mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Relevance Score</span>
                            <span className="text-sm font-medium text-blue-600">
                              {Math.round(item.relevance * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.relevance * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-end">
                  <Button variant="primary" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EvidenceDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  evidence: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string.isRequired,
      snippet: PropTypes.string.isRequired,
      relevance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default EvidenceDrawer;