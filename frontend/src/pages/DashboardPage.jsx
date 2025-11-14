import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Target, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../api';
import ProgressDashboard from '../components/ProgressDashboard';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [recentCurriculum, setRecentCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, curriculumRes] = await Promise.all([
        api.get('/analytics/progress'),
        api.get('/curriculum/')
      ]);

      setAnalytics(analyticsRes.data);
      setRecentCurriculum(curriculumRes.data[0] || null);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewCurriculum = async () => {
    try {
      const { data: curriculum } = await api.post('/curriculum/generate');
      setRecentCurriculum(curriculum);
    } catch (error) {
      console.error('Failed to generate curriculum:', error);
      alert('Failed to generate new curriculum. Please try again.');
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {currentUser?.full_name}!
        </h1>
        <p className="text-gray-600">
          Ready to continue your learning journey in Grade {currentUser?.grade_level}?
        </p>
        
        {!recentCurriculum && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Start Your Learning Journey
            </h3>
            <p className="text-blue-700 mb-4">
              Generate your personalized 8-week curriculum to get started with AI-powered learning.
            </p>
            <button
              onClick={generateNewCurriculum}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Generate My Curriculum
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(analytics.total_study_time / 60)}h
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proficiency</p>
                <p className="text-2xl font-bold text-gray-800">
                  {analytics.average_proficiency.toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Topics Completed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {analytics.completed_topics}/{analytics.total_topics}
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Week</p>
                <p className="text-2xl font-bold text-gray-800">
                  {recentCurriculum ? 'Week 1' : '--'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      )}

      {/* Progress Dashboard */}
      {analytics && <ProgressDashboard analytics={analytics} />}

      {/* Recent Curriculum Preview */}
      {recentCurriculum && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Current Curriculum</h2>
            <button
              onClick={generateNewCurriculum}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Regenerate
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {recentCurriculum.title}
            </h3>
            <p className="text-blue-700 mb-4">{recentCurriculum.description}</p>
            <div className="flex items-center space-x-4 text-sm text-blue-600">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{recentCurriculum.duration_weeks} weeks</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Personalized Plan</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="/curriculum"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>View Full Curriculum</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;