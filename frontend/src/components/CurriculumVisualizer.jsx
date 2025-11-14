import React, { useState } from 'react';
import { Calendar, BookOpen, Clock, Target, CheckCircle } from 'lucide-react';

const CurriculumVisualizer = ({ curriculum }) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  if (!curriculum || !curriculum.weekly_plans) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No curriculum generated yet</h3>
        <p className="mt-2 text-gray-500">Generate a personalized curriculum to get started.</p>
      </div>
    );
  }

  const currentWeek = curriculum.weekly_plans[selectedWeek];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">{curriculum.title}</h2>
        <p className="text-blue-100 mt-1">{curriculum.description}</p>
      </div>

      <div className="p-6">
        {/* Week Selector */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {curriculum.weekly_plans.map((week, index) => (
            <button
              key={week.week_number}
              onClick={() => setSelectedWeek(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedWeek === index
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Week {week.week_number}</span>
            </button>
          ))}
        </div>

        {/* Week Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Focus Areas & Objectives */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentWeek.focus_areas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Learning Objectives
              </h3>
              <ul className="space-y-2">
                {currentWeek.learning_objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-green-800">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Daily Breakdown */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Weekly Schedule
              </h3>
              <div className="space-y-3">
                {Object.entries(currentWeek.daily_breakdown).map(([day, schedule]) => (
                  <div
                    key={day}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 capitalize">{day}</h4>
                      <p className="text-sm text-gray-600">
                        {schedule.subject} - {schedule.topic}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {schedule.activities.map((activity, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-white px-2 py-1 rounded border"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-500">
                        60-90 min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources & Progress */}
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                Resources Needed
              </h3>
              <ul className="space-y-2">
                {currentWeek.resources_needed.map((resource, index) => (
                  <li key={index} className="flex items-center text-purple-800">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {resource}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">
                Weekly Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-orange-700">Completion</span>
                  <span className="font-semibold text-orange-900">
                    {currentWeek.completed ? '100%' : '0%'}
                  </span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: currentWeek.completed ? '100%' : '0%' }}
                  ></div>
                </div>
                <button
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    currentWeek.completed
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200'
                  }`}
                >
                  {currentWeek.completed ? 'Week Completed!' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumVisualizer;