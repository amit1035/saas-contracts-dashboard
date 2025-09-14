import React, { createContext, useContext, useState, useEffect } from 'react';
import { getContracts, getContractById } from '../api/contracts';

const ContractsContext = createContext();

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch all contracts on mount
  useEffect(() => {
    console.log('ContractsContext: useEffect triggered');
    fetchContracts();
  }, []);
  
  const fetchContracts = async () => {
    console.log('ContractsContext: fetchContracts called');
    setLoading(true);
    setError(null);
    
    try {
      console.log('ContractsContext: Calling getContracts API');
      const data = await getContracts();
      console.log('ContractsContext: API response:', data);
      setContracts(data);
      console.log('ContractsContext: Contracts state updated:', data);
    } catch (err) {
      console.error('ContractsContext: Error fetching contracts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const getContract = async (id) => {
    console.log('ContractsContext: getContract called with id:', id);
    try {
      const data = await getContractById(id);
      console.log('ContractsContext: getContract response:', data);
      return data;
    } catch (err) {
      console.error('ContractsContext: Error fetching contract:', err);
      setError(err.message);
      throw err;
    }
  };
  
  const value = {
    contracts,
    loading,
    error,
    getContract
  };
  
  console.log('ContractsContext: Context value:', value);
  
  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>;
};

// Custom hook to use the contracts context
export const useContracts = () => {
  console.log('useContracts hook called');
  const context = useContext(ContractsContext);
  console.log('useContracts context:', context);
  if (!context) {
    throw new Error('useContracts must be used within a ContractsProvider');
  }
  return context;
};