import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Button from '../common/Button';
import Loading from '../common/Loading';

const LoginForm = ({ onLogin, isLoading = false, error = '' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { username, password });
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = onLogin({ username, password });
      console.log('Login success:', success);
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="text"
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Hint: Use any username and password "test123"
          </p>
        </div>
        
        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading || isSubmitting}
            className="w-full py-3"
          >
            {isLoading || isSubmitting ? <Loading size="sm" /> : 'Sign In'}
          </Button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default LoginForm;