import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gradeLevel: 6,
    learningStyle: 'visual',
    weakSubjects: [],
    learningGoals: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const subjects = [
    'Mathematics', 'Science', 'English', 'Social Studies',
    'History', 'Geography', 'Physics', 'Chemistry', 'Biology'
  ];

  const learningStyles = [
    { value: 'visual', label: 'Visual Learner (prefers diagrams, charts)' },
    { value: 'auditory', label: 'Auditory Learner (prefers listening, discussions)' },
    { value: 'kinesthetic', label: 'Kinesthetic Learner (prefers hands-on activities)' },
    { value: 'read_write', label: 'Read/Write Learner (prefers reading, writing)' }
  ];

  const handleSubjectToggle = (subject) => {
    setFormData(prev => ({
      ...prev,
      weakSubjects: prev.weakSubjects.includes(subject)
        ? prev.weakSubjects.filter(s => s !== subject)
        : [...prev.weakSubjects, subject]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Register student
      await api.post('/auth/register', formData);
      
      // Auto login after registration
      const { data: tokenData } = await api.post('/auth/token', {
        username: formData.email,
        password: formData.password
      });
      
      login(tokenData.access_token, tokenData.student_id);
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Create Your Learning Profile
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade Level *
            </label>
            <select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[4, 5, 6, 7, 8, 9].map(grade => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Learning Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Learning Style Preference *
          </label>
          <div className="space-y-2">
            {learningStyles.map(style => (
              <label key={style.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="learningStyle"
                  value={style.value}
                  checked={formData.learningStyle === style.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{style.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Weak Subjects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select subjects you want to improve *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.map(subject => (
              <label
                key={subject}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.weakSubjects.includes(subject)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.weakSubjects.includes(subject)}
                  onChange={() => handleSubjectToggle(subject)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Learning Goals
          </label>
          <textarea
            name="learningGoals"
            value={formData.learningGoals}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What do you hope to achieve with personalized tutoring?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || formData.weakSubjects.length === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            loading || formData.weakSubjects.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {loading ? 'Creating Your Profile...' : 'Start Learning Journey'}
        </button>

        {formData.weakSubjects.length === 0 && (
          <p className="text-sm text-red-600 text-center">
            Please select at least one subject to continue
          </p>
        )}
      </form>
    </div>
  );
};

export default StudentForm;