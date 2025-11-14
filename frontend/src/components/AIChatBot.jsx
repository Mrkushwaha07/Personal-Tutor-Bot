import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import api from '../api';
import { useAuth } from '../hooks/useAuth';

const AIChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createNewSession = async () => {
    try {
      const { data: session } = await api.post('/chat/sessions', {
        session_title: 'Learning Assistance'
      });
      setSessionId(session.id);
      return session.id;
    } catch (error) {
      console.error('Failed to create chat session:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      content: inputMessage,
      is_user: true,
      message_type: 'question'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Ensure we have a session
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = await createNewSession();
      }

      // Send message to backend
      const { data: response } = await api.post('/chat/message', {
        session_id: currentSessionId,
        content: inputMessage,
        student_context: {
          grade_level: currentUser.grade_level,
          weak_subjects: currentUser.weak_subjects,
          learning_style: currentUser.learning_style
        }
      });

      const botMessage = {
        content: response.response,
        is_user: false,
        message_type: 'explanation'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = {
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        is_user: false,
        message_type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const generatePracticeQuestion = async (subject) => {
    setLoading(true);
    try {
      const { data: question } = await api.post('/chat/practice-question', {
        topic: subject,
        difficulty: 'medium'
      });

      const questionMessage = {
        content: `**Practice Question**: ${question.question}\n\nOptions:\n${Object.entries(question.options).map(([key, value]) => `${key}. ${value}`).join('\n')}`,
        is_user: false,
        message_type: 'practice_question',
        metadata: question
      };

      setMessages(prev => [...prev, questionMessage]);
    } catch (error) {
      console.error('Failed to generate practice question:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-lg font-semibold text-white">AI Tutor Assistant</h3>
            <p className="text-blue-100 text-sm">Ask me anything about your subjects!</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
        <div className="flex space-x-2 overflow-x-auto">
          {currentUser?.weak_subjects?.map((subject) => (
            <button
              key={subject}
              onClick={() => generatePracticeQuestion(subject)}
              disabled={loading}
              className="flex-shrink-0 bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-300 hover:bg-blue-50 transition-colors"
            >
              {subject} Practice
            </button>
          ))}
          <button
            onClick={() => setInputMessage("Can you explain this week's main concepts?")}
            disabled={loading}
            className="flex-shrink-0 bg-white text-green-700 px-3 py-1 rounded-full text-sm font-medium border border-green-300 hover:bg-green-50 transition-colors"
          >
            Explain Concepts
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Hello! I'm your AI tutor. How can I help you learn today?</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.is_user ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex space-x-3 max-w-[80%] ${
                message.is_user ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.is_user
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {message.is_user ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.is_user
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {message.metadata?.explanation && (
                  <div className="mt-2 p-2 bg-white bg-opacity-20 rounded text-sm">
                    <strong>Explanation:</strong> {message.metadata.explanation}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gray-700" />
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-100">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask a question about your subjects..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              loading || !inputMessage.trim()
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatBot;