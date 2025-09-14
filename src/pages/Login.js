import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Already authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (credentials) => {
    console.log('Login page handleLogin called');
    login(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              CL
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">ContractLens</h1>
          <p className="mt-2 text-gray-600">SaaS Contract Management Dashboard</p>
        </div>
        <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
        <div className="text-center text-sm text-gray-500">
          <p>© 2023 ContractLens. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;