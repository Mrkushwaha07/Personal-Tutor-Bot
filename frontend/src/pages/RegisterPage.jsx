import React from 'react';
import StudentForm from '../components/StudentForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join Personal Tutor Bot
          </h1>
          <p className="text-gray-600 text-lg">
            Create your personalized learning profile and start your AI-powered education journey
          </p>
        </div>
        <StudentForm />
      </div>
    </div>
  );
};

export default RegisterPage;