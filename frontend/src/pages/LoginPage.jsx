import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Personal Tutor Bot
          </h1>
          <p className="text-gray-600">Sign in to your learning account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;