/**
 * Utility functions for Personal Tutor Bot
 * Common helper functions used across the application
 */

// Format time in minutes to readable string
export const formatStudyTime = (minutes) => {
  if (!minutes || minutes === 0) return '0m';
  
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}m`;
};

// Calculate progress percentage
export const calculateProgress = (completed, total) => {
  if (!total || total === 0) return 0;
  const percentage = (completed / total) * 100;
  return Math.round(percentage * 10) / 10; // Round to 1 decimal place
};

// Get color classes based on proficiency score
export const getProficiencyColor = (score) => {
  if (score >= 90) return 'text-green-800 bg-green-100 border-green-200';
  if (score >= 80) return 'text-green-700 bg-green-50 border-green-100';
  if (score >= 70) return 'text-blue-700 bg-blue-50 border-blue-100';
  if (score >= 60) return 'text-yellow-700 bg-yellow-50 border-yellow-100';
  if (score >= 50) return 'text-orange-700 bg-orange-50 border-orange-100';
  return 'text-red-700 bg-red-50 border-red-100';
};

// Get color for progress bars based on score
export const getProgressBarColor = (score) => {
  if (score >= 90) return 'bg-green-500';
  if (score >= 80) return 'bg-green-400';
  if (score >= 70) return 'bg-blue-500';
  if (score >= 60) return 'bg-yellow-500';
  if (score >= 50) return 'bg-orange-500';
  return 'bg-red-500';
};

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return 'Invalid Date';
  }
};

// Format date for relative time (e.g., "2 days ago")
export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    return 'Invalid Date';
  }
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random color for avatars or subjects
export const generateRandomColor = (seed) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
    'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-amber-500'
  ];
  
  if (seed) {
    // Generate consistent color based on seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }
  
  // Random color
  return colors[Math.floor(Math.random() * colors.length)];
};

// Calculate estimated study time for topics
export const estimateStudyTime = (topic, difficulty = 'medium') => {
  const baseTimes = {
    easy: 20,    // 20 minutes
    medium: 45,  // 45 minutes  
    hard: 90     // 90 minutes
  };
  
  return baseTimes[difficulty] || baseTimes.medium;
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get initial letters for avatar
export const getInitials = (name) => {
  if (!name) return 'U';
  
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Sort array by property
export const sortByProperty = (array, property, ascending = true) => {
  return [...array].sort((a, b) => {
    const aValue = a[property];
    const bValue = b[property];
    
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });
};

// Filter array by search term
export const filterBySearch = (array, searchTerm, properties) => {
  if (!searchTerm) return array;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return array.filter(item => 
    properties.some(prop => {
      const value = item[prop];
      return value && value.toString().toLowerCase().includes(lowerSearchTerm);
    })
  );
};

// Group array by property
export const groupBy = (array, property) => {
  return array.reduce((groups, item) => {
    const key = item[property];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

// Calculate average of array property
export const calculateAverage = (array, property) => {
  if (!array || array.length === 0) return 0;
  
  const sum = array.reduce((total, item) => {
    return total + (item[property] || 0);
  }, 0);
  
  return Math.round((sum / array.length) * 10) / 10;
};

// Generate unique ID
export const generateId = (prefix = '') => {
  return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Check if object is empty
export const isEmpty = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Get week number from date
export const getWeekNumber = (date) => {
  if (!date) return 1;
  
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  
  return weekNo;
};

// Get current academic week (assuming 8-week curriculum)
export const getCurrentAcademicWeek = (startDate) => {
  if (!startDate) return 1;
  
  const start = new Date(startDate);
  const now = new Date();
  const diffInMs = now - start;
  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7)) + 1;
  
  return Math.min(Math.max(diffInWeeks, 1), 8); // Clamp between 1 and 8
};

// Format number with commas
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '0';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Get difficulty badge color
export const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    hard: 'bg-red-100 text-red-800 border-red-200',
    beginner: 'bg-blue-100 text-blue-800 border-blue-200',
    advanced: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  
  return colors[difficulty?.toLowerCase()] || colors.medium;
};

// Get subject icon (placeholder - you can replace with actual icons)
export const getSubjectIcon = (subject) => {
  const icons = {
    mathematics: '🧮',
    science: '🔬',
    english: '📚',
    history: '🏛️',
    geography: '🌍',
    physics: '⚛️',
    chemistry: '🧪',
    biology: '🧬',
    social: '👥'
  };
  
  return icons[subject?.toLowerCase()] || '📖';
};

// Calculate age from birth date (if needed for student profiles)
export const calculateAge = (birthDate) => {
  if (!birthDate) return null;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export default {
  formatStudyTime,
  calculateProgress,
  getProficiencyColor,
  getProgressBarColor,
  formatDate,
  formatRelativeTime,
  debounce,
  capitalizeWords,
  truncateText,
  generateRandomColor,
  estimateStudyTime,
  isValidEmail,
  validatePassword,
  formatFileSize,
  getInitials,
  sortByProperty,
  filterBySearch,
  groupBy,
  calculateAverage,
  generateId,
  isEmpty,
  deepClone,
  getWeekNumber,
  getCurrentAcademicWeek,
  formatNumber,
  getDifficultyColor,
  getSubjectIcon,
  calculateAge
};