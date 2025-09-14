import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContractsProvider } from './context/ContractsContext';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContractDetail from './components/contracts/ContractDetail';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  console.log('ProtectedRoute rendered');
  const { isAuthenticated, isLoading } = useAuth();
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  console.log('App component rendering');
  return (
    <AuthProvider>
      <ContractsProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contracts/:id" 
              element={
                <ProtectedRoute>
                  <div className="flex h-screen bg-gray-50">
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <main className="flex-1 overflow-y-auto p-6">
                        <ContractDetail />
                      </main>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ContractsProvider>
    </AuthProvider>
  );
};

export default App;