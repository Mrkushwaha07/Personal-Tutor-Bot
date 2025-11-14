import React from 'react';
import AIChatBot from '../components/AIChatBot';

const ChatPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">AI Tutor Chat</h1>
        <p className="text-gray-600 mt-2">
          Get instant help with your subjects from our AI tutor
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <AIChatBot />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Ask Questions</h3>
          <p className="text-blue-700 text-sm">
            Get explanations for difficult concepts in any subject
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Practice Problems</h3>
          <p className="text-green-700 text-sm">
            Generate practice questions with step-by-step solutions
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">24/7 Available</h3>
          <p className="text-purple-700 text-sm">
            Get help anytime, anywhere with our AI tutor
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;