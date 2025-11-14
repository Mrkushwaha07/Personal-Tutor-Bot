import React from 'react';
import { TrendingUp, Clock, Target, Award, BookOpen, BarChart3 } from 'lucide-react';
import { formatStudyTime, calculateProgress, getProficiencyColor } from '../utils/helpers';

const ProgressDashboard = ({ analytics }) => {
  if (!analytics) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600">No Progress Data Yet</h3>
        <p className="text-gray-500">Complete some lessons to see your progress analytics</p>
      </div>
    );
  }

  const {
    total_study_time,
    average_proficiency,
    completed_topics,
    total_topics,
    subject_breakdown
  } = analytics;

  const overallProgress = calculateProgress(completed_topics, total_topics);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Learning Progress</h2>
        <div className="flex items-center space-x-2 text-blue-600">
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">Overall Progress: {overallProgress}%</span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Overall Progress */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Course Completion</span>
            <span className="text-sm font-semibold text-blue-600">
              {completed_topics}/{total_topics} topics
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>

          {/* Average Proficiency */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm font-medium text-gray-700">Average Proficiency</span>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getProficiencyColor(average_proficiency)}`}>
              {average_proficiency.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${average_proficiency}%` }}
            ></div>
          </div>
        </div>

        {/* Study Statistics */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Study Statistics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Total Study Time</span>
              </div>
              <span className="font-semibold text-gray-800">
                {formatStudyTime(total_study_time)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Completion Rate</span>
              </div>
              <span className="font-semibold text-gray-800">{overallProgress}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">Proficiency Score</span>
              </div>
              <span className="font-semibold text-gray-800">{average_proficiency.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      {subject_breakdown && Object.keys(subject_breakdown).length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Subject Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(subject_breakdown).map(([subject, data]) => {
              const subjectProgress = calculateProgress(data.completed, data.total);
              return (
                <div
                  key={subject}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-800">{subject}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getProficiencyColor(data.average_score)}`}>
                      {data.average_score.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{subjectProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${subjectProgress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{data.completed}/{data.total} completed</span>
                      <span>{formatStudyTime(data.total_time)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly Progress Chart (Placeholder) */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Progress Trend</h3>
        <div className="flex items-end justify-between h-32">
          {[65, 72, 68, 85, 78, 90, 88].map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className="w-8 bg-gradient-to-t from-purple-500 to-purple-600 rounded-t-lg transition-all duration-500 hover:from-purple-600 hover:to-purple-700"
                style={{ height: `${value}%` }}
                title={`Week ${index + 1}: ${value}%`}
              ></div>
              <span className="text-xs text-gray-600">W{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Proficiency Trend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Recent Achievements
          </h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            {completed_topics >= 1 && (
              <li>• Completed your first topic!</li>
            )}
            {completed_topics >= 5 && (
              <li>• Mastered 5+ topics</li>
            )}
            {total_study_time > 300 && (
              <li>• Studied for 5+ hours total</li>
            )}
            {average_proficiency > 80 && (
              <li>• Excellent proficiency score!</li>
            )}
            {completed_topics === 0 && (
              <li>• Start your first lesson to earn achievements!</li>
            )}
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">AI Recommendations</h4>
          <ul className="space-y-1 text-sm text-green-700">
            {average_proficiency < 70 && (
              <li>• Focus on reviewing completed topics</li>
            )}
            {overallProgress < 50 && (
              <li>• Try to complete at least one topic daily</li>
            )}
            {Object.entries(subject_breakdown || {}).some(([_, data]) => data.average_score < 60) && (
              <li>• Practice weaker subjects with our AI tutor</li>
            )}
            <li>• Use the chat tutor for difficult concepts</li>
            <li>• Take regular breaks during study sessions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;