import React from 'react';
import { Brain, Mail, Github, Twitter, BookOpen } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Personal Tutor Bot</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              AI-powered educational platform providing personalized learning experiences 
              for students from class 4 to class 9. Learn smarter with adaptive curriculum 
              and 24/7 AI tutoring.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@personaltutorbot.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/curriculum"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="/chat"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  AI Tutor
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>AI Curriculum</span>
              </li>
              <li className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-green-400" />
                <span>Adaptive Learning</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>24/7 Tutoring</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Personal Tutor Bot. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/contact"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;