import { useAuth as useContextAuth } from '../context/AuthContext';

// Create a wrapper hook that re-exports the context hook
export const useAuth = () => {
  console.log('useAuth wrapper hook called');
  return useContextAuth();
};