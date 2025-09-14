import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContracts } from '../../hooks/useContracts';
import ContractTable from './ContractTable';
import ContractFilters from './ContractFilters';
import Loading from '../common/Loading';
import Button from '../common/Button';
import Card from '../common/Card';
import UploadModal from '../upload/UploadModal';

const ContractList = () => {
  console.log('ContractList component rendering');
  const navigate = useNavigate();
  const { contracts, loading, error } = useContracts();
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  console.log('ContractList - contracts:', contracts);
  console.log('ContractList - loading:', loading);
  console.log('ContractList - error:', error);
  
  const contractsPerPage = 10;
  
  useEffect(() => {
    console.log('ContractList useEffect triggered');
    let result = [...contracts];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(contract => 
        contract.name.toLowerCase().includes(term) || 
        contract.parties.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(contract => contract.status === statusFilter);
    }
    
    // Apply risk filter
    if (riskFilter) {
      result = result.filter(contract => contract.risk === riskFilter);
    }
    
    setFilteredContracts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [contracts, searchTerm, statusFilter, riskFilter]);
  
  const handleViewContract = (id) => {
    navigate(`/contracts/${id}`);
  };
  
  const handleUpload = () => {
    setIsUploadModalOpen(true);
  };
  
  const handleCloseUpload = () => {
    setIsUploadModalOpen(false);
  };
  
  // Get current contracts for pagination
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = filteredContracts.slice(indexOfFirstContract, indexOfLastContract);
  const totalPages = Math.ceil(filteredContracts.length / contractsPerPage);
  
  console.log('ContractList - filteredContracts:', filteredContracts);
  console.log('ContractList - currentContracts:', currentContracts);
  
  if (loading && contracts.length === 0) {
    console.log('ContractList - Loading state');
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Loading contracts..." />
      </div>
    );
  }
  
  if (error) {
    console.log('ContractList - Error state:', error);
    return (
      <Card>
        <div className="bg-red-50 p-4 rounded-md text-red-700">
          Error loading contracts: {error}
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contracts</h1>
          <p className="text-gray-600 mt-1">Manage and analyze your contracts</p>
        </div>
        <Button 
          variant="primary" 
          onClick={handleUpload}
          className="self-start sm:self-auto"
        >
          Upload Contract
        </Button>
      </div>
      
      <ContractFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        riskFilter={riskFilter}
        onRiskChange={setRiskFilter}
      />
      
      {filteredContracts.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No contracts found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter || riskFilter 
                ? 'Try adjusting your filters' 
                : 'Upload your first contract to get started'}
            </p>
            <Button variant="primary" onClick={handleUpload}>
              Upload Contract
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <ContractTable 
            contracts={currentContracts}
            onViewContract={handleViewContract}
          />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstContract + 1} to {Math.min(indexOfLastContract, filteredContracts.length)} of {filteredContracts.length} contracts
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
      
      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadModal isOpen={isUploadModalOpen} onClose={handleCloseUpload} />
      )}
    </div>
  );
};

export default ContractList;