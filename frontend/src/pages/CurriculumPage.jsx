import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api';
import CurriculumVisualizer from '../components/CurriculumVisualizer';

const CurriculumPage = () => {
  const { currentUser } = useAuth();
  const [curricula, setCurricula] = useState([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchCurricula();
  }, []);

  const fetchCurricula = async () => {
    try {
      const { data } = await api.get('/curriculum/');
      setCurricula(data);
      if (data.length > 0) {
        setSelectedCurriculum(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch curricula:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewCurriculum = async () => {
    setGenerating(true);
    try {
      const { data: newCurriculum } = await api.post('/curriculum/generate');
      setCurricula(prev => [newCurriculum, ...prev]);
      setSelectedCurriculum(newCurriculum);
    } catch (error) {
      console.error('Failed to generate curriculum:', error);
      alert('Failed to generate new curriculum. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Curriculum</h1>
          <p className="text-gray-600 mt-2">
            Personalized learning plan for Grade {currentUser?.grade_level}
          </p>
        </div>
        <button
          onClick={generateNewCurriculum}
          disabled={generating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {generating ? 'Generating...' : 'Generate New Curriculum'}
        </button>
      </div>

      {curricula.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              No Curriculum Generated Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Generate your first personalized curriculum to start your learning journey with AI-powered tutoring.
            </p>
            <button
              onClick={generateNewCurriculum}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Create My First Curriculum
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Curriculum List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your Curricula
              </h3>
              <div className="space-y-2">
                {curricula.map((curriculum) => (
                  <button
                    key={curriculum.id}
                    onClick={() => setSelectedCurriculum(curriculum)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCurriculum?.id === curriculum.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{curriculum.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(curriculum.created_at).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Curriculum Details */}
          <div className="lg:col-span-3">
            {selectedCurriculum && (
              <CurriculumVisualizer curriculum={selectedCurriculum} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumPage;