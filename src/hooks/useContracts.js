import { useContracts as useContextContracts } from '../context/ContractsContext';

// Create a wrapper hook that re-exports the context hook
export const useContracts = () => {
  console.log('useContracts wrapper hook called');
  const context = useContextContracts();
  console.log('useContracts wrapper hook context:', context);
  return context;
};