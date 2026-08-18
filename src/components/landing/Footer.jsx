import React from 'react';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.977 1.977 0 11.001-3.954 1.977 1.977 0 010 3.954zm1.977 13.019H3.36V9h3.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="text-center md:text-left">
            <a href="#" className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Mail className="text-[#0B0F19]" size={18} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                Cold<span className="text-amber-500">Mailer</span>
              </span>
            </a>
            <p className="text-slate-400 max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              AI-powered cold outreach generator. Land your next opportunity with the perfect email.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col space-y-3 text-center md:text-left">
              <h4 className="text-white font-bold mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Product</h4>
              <a href="#features" className="text-slate-400 hover:text-amber-400 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>Features</a>
              <a href="#timeline" className="text-slate-400 hover:text-amber-400 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>How it Works</a>
              <a href="#faq" className="text-slate-400 hover:text-amber-400 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>FAQ</a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2025 ColdMailer · Built by Anuj Gupta
          </p>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/aanuj-guptaa" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <GithubIcon size={20} />
            </a>
            <a href="https://www.linkedin.com/in/anuj-gupta-52254529a/" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
