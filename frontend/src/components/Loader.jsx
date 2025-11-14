import React from 'react';

const Loader = ({ 
  size = 'medium', 
  color = 'blue', 
  text = null,
  overlay = false 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    purple: 'border-purple-600',
    white: 'border-white',
    gray: 'border-gray-600'
  };

  const spinnerClass = `
    animate-spin rounded-full border-4 border-solid 
    border-t-transparent
    ${sizeClasses[size]} 
    ${colorClasses[color]}
  `;

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 flex flex-col items-center space-y-4">
          <div className={spinnerClass}></div>
          {text && <p className="text-gray-700 font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={spinnerClass}></div>
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

// Specific loader variants for common use cases
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader size="large" text="Loading..." />
  </div>
);

export const ButtonLoader = ({ color = 'white' }) => (
  <div className="flex items-center space-x-2">
    <Loader size="small" color={color} />
    <span>Loading...</span>
  </div>
);

export const CardLoader = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
    <div className="flex space-x-4">
      <div className="rounded-full bg-gray-300 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

export const CurriculumLoader = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((item) => (
      <CardLoader key={item} />
    ))}
  </div>
);

export default Loader;