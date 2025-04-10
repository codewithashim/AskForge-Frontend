
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import Navbar from '@/components/layout/Navbar';
import { MessageSquare } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 bg-chatcanvas-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MessageSquare className="h-8 w-8 text-chatcanvas-blue" />
              <h1 className="text-2xl font-bold">ChatCanvas</h1>
            </div>
            <h2 className="text-2xl font-bold text-chatcanvas-gray-900">Sign In</h2>
            <p className="text-chatcanvas-gray-500">Access your ChatCanvas account</p>
          </div>
          
          <LoginForm />
          
          <p className="text-center mt-8 text-sm text-chatcanvas-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-chatcanvas-blue hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-chatcanvas-blue hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
