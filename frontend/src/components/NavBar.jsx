import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  BookOpen,
  MessageCircle,
  BarChart3,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3, description: 'Your learning progress' },
    { name: 'Curriculum', href: '/curriculum', icon: BookOpen, description: 'Study plans' },
    { name: 'AI Tutor', href: '/chat', icon: MessageCircle, description: 'Get help' },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="glass border-b border-white/20 sticky top-0 z-50 backdrop-blur-glass">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Enhanced */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group animate-fade-in-up"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Personal Tutor Bot
              </h1>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-purple-500" />
                <p className="text-xs text-gray-600 hidden sm:block">
                  AI-Powered Learning
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-2 bg-white/50 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/30 shadow-sm">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover-lift ${
                    isActiveRoute(item.href)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/80'
                  }`}
                  title={item.description}
                >
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActiveRoute(item.href) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu & Auth - Enhanced */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:block relative">
                  <button
                    onClick={toggleUserMenu}
                    className="group flex items-center space-x-3 bg-white/80 hover:bg-white backdrop-blur-sm rounded-2xl px-4 py-2 transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-blue-300 focus-ring"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {currentUser.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-800 max-w-32 truncate">
                          {currentUser.full_name}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center space-x-1">
                          <span>Grade {currentUser.grade_level}</span>
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User Dropdown - Enhanced */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 glass rounded-2xl shadow-2xl border border-white/20 py-3 z-50 animate-fade-in-up">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-white/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {currentUser.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {currentUser.full_name}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="badge">Grade {currentUser.grade_level}</span>
                              <span className="badge-success">{currentUser.learning_style}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/50 transition-all duration-200 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BarChart3 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                          <div>
                            <span className="font-medium">Dashboard</span>
                            <p className="text-xs text-gray-500">View your progress</p>
                          </div>
                        </Link>
                        
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/50 transition-all duration-200 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                          <div>
                            <span className="font-medium">Profile Settings</span>
                            <p className="text-xs text-gray-500">Manage your account</p>
                          </div>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50/50 transition-all duration-200 group"
                        >
                          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <div>
                            <span className="font-medium">Sign Out</span>
                            <p className="text-xs text-red-500">End your session</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile User Info */}
                <div className="md:hidden flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {currentUser.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover-lift px-4 py-2 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg border border-transparent hover:border-white/30 focus-ring"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 animate-slide-in-right">
            {/* Navigation Links */}
            <div className="space-y-2 mb-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center space-x-4 px-4 py-4 rounded-2xl font-medium transition-all duration-300 hover-lift ${
                      isActiveRoute(item.href)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:text-blue-600 bg-white/50 hover:bg-white/80'
                    }`}
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <div className="flex-1">
                      <span className="font-semibold">{item.name}</span>
                      <p className="text-xs opacity-70 mt-1">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            {currentUser ? (
              <div className="pt-4 border-t border-white/20">
                {/* User Info */}
                <div className="px-4 py-3 mb-3 bg-white/30 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {currentUser.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {currentUser.full_name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="badge text-xs">Grade {currentUser.grade_level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-2xl text-gray-700 hover:bg-blue-50/50 transition-all duration-200 mb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 text-green-500" />
                  <span>Profile Settings</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50/50 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/20 space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 rounded-2xl text-gray-700 hover:bg-white/80 transition-all duration-300 font-medium border border-white/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center btn-primary py-3 rounded-2xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay for user dropdown */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;