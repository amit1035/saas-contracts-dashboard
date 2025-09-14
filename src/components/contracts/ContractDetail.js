import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContracts } from '../../hooks/useContracts';
import { formatDate } from '../../utils/date';
import { getRiskColorClass, getStatusColorClass } from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';
import ContractDetailLoader from '../common/ContractDetailLoader';
import EvidenceDrawer from './EvidenceDrawer';

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getContract } = useContracts();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  
  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('ContractDetail: Fetching contract with id:', id);
        const data = await getContract(id);
        console.log('ContractDetail: Contract data received:', data);
        setContract(data);
      } catch (err) {
        console.error('ContractDetail: Error fetching contract:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContract();
  }, [id, getContract]);
  
  if (loading) {
    return <ContractDetailLoader />;
  }
  
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700">
        Error loading contract: {error}
      </div>
    );
  }
  
  if (!contract) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md text-yellow-700">
        Contract not found
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{contract.name}</h1>
          <p className="text-gray-600 mt-1">{contract.parties}</p>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="self-start sm:self-auto"
        >
          ← Back to Dashboard
        </Button>
      </div>
      
      {/* Contract Metadata */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Start Date</h3>
            <p className="text-lg font-medium text-gray-900">{formatDate(contract.start)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Expiry Date</h3>
            <p className="text-lg font-medium text-gray-900">{formatDate(contract.expiry)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <p className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColorClass(contract.status)}`}>
              {contract.status}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Risk Score</h3>
            <p className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskColorClass(contract.risk)}`}>
              {contract.risk}
            </p>
          </div>
        </div>
      </Card>
      
      {/* Clauses Section */}
      <Card title="Clauses">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contract.clauses.map((clause, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{clause.title}</h3>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {Math.round(clause.confidence * 100)}%
                </span>
              </div>
              <p className="text-gray-600 mb-3">{clause.summary}</p>
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${clause.confidence * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Confidence Score</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* AI Insights Section */}
      <Card title="AI Insights">
        <div className="space-y-3">
          {contract.insights.map((insight, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-l-4 ${
                insight.risk === 'High' ? 'bg-red-50 border-red-500' : 
                insight.risk === 'Medium' ? 'bg-yellow-50 border-yellow-500' : 
                'bg-green-50 border-green-500'
              }`}
            >
              <div className="flex items-start">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3 ${
                  insight.risk === 'High' ? 'bg-red-100 text-red-800' : 
                  insight.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.risk}
                </span>
                <p className="text-gray-700">{insight.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Evidence Panel */}
      <Card title="Evidence">
        <div className="space-y-3">
          {contract.evidence.map((evidence, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{evidence.source}</span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(evidence.relevance * 100)}%
                </span>
              </div>
              <p className="text-gray-600 mb-3">{evidence.snippet}</p>
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${evidence.relevance * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Relevance Score</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button 
            variant="secondary" 
            onClick={() => setIsEvidenceOpen(true)}
            className="w-full sm:w-auto"
          >
            View Evidence Details
          </Button>
        </div>
      </Card>
      
      {/* Evidence Drawer */}
      <EvidenceDrawer 
        isOpen={isEvidenceOpen} 
        onClose={() => setIsEvidenceOpen(false)}
        evidence={contract.evidence}
      />
    </div>
  );
};

export default ContractDetail;