import React, { useState } from 'react';

export const UseCases = () => {
  const [activeTab, setActiveTab] = useState(0);

  const cases = [
    {
      id: "internships",
      title: "Tech Internships",
      desc: "Stand out from thousands of applicants by emailing recruiters or engineering managers directly. ColdMailer highlights your projects and enthusiasm in a way that gets responses.",
      stats: ["3x higher interview rate", "Highlights key projects", "Perfect for students"],
      email: {
        to: "recruiting@startup.io",
        subject: "CS Junior w/ React experience — interested in Summer 2025 Internship",
        body: "Hi [Name],\n\nI noticed your team recently launched [Product Feature] and I was really impressed by the smooth UI. As a CS junior who recently built a similar React application using Tailwind, I'd love to..."
      }
    },
    {
      id: "swe",
      title: "Software Engineering",
      desc: "Bypass the resume black hole. Connect directly with CTOs and VPs of Engineering by showing you've researched their tech stack and current engineering challenges.",
      stats: ["Direct access to hiring managers", "Shows technical depth", "Bypass ATS filters"],
      email: {
        to: "cto@techcorp.dev",
        subject: "Scaling your Node.js microservices — experienced SWE here",
        body: "Hi [Name],\n\nI saw your recent engineering blog post about migrating to microservices. Having just led a similar transition at my previous company reducing latency by 40%, I wanted to see if..."
      }
    },
    {
      id: "startup",
      title: "Startup & VC",
      desc: "Reach elusive founders or partners. ColdMailer crafts concise, high-impact messages that respect their time while clearly communicating your unique value proposition.",
      stats: ["High impact, low word count", "Respects founder's time", "Clear value prop focus"],
      email: {
        to: "partner@venture.fund",
        subject: "Quick question regarding your thesis on Web3 infrastructure",
        body: "Hi [Name],\n\nI've been following your recent investments in the infrastructure space. We're currently building [Product] which solves the exact bottleneck you mentioned in your recent tweet..."
      }
    },
    {
      id: "research",
      title: "Research Positions",
      desc: "Connect with professors and principal investigators by intelligently referencing their recent publications and aligning your academic background with their current lab work.",
      stats: ["References recent papers", "Aligns academic interests", "Professional & respectful"],
      email: {
        to: "prof.smith@university.edu",
        subject: "Prospective RA — highly interested in your recent NLP paper",
        body: "Dear Professor Smith,\n\nI read your recent paper on transformer efficiency with great interest. Given my background in computational linguistics and recent project optimizing attention mechanisms..."
      }
    }
  ];

  return (
    <section id="usecases" className="py-24 bg-[#0B0F19] relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Built For Every Opportunity
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {cases.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-full transition-all duration-300 text-sm md:text-base font-medium relative ${
                activeTab === idx 
                  ? 'text-amber-400 bg-amber-500/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {tab.title}
              {activeTab === idx && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-400 rounded-t-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto relative min-h-[400px]">
          {cases.map((content, idx) => (
            <div 
              key={content.id}
              className={`transition-all duration-500 absolute inset-0 ${
                activeTab === idx 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                {/* Left Side: Description & Stats */}
                <div className="space-y-8">
                  <p 
                    className="text-lg text-slate-300 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {content.desc}
                  </p>
                  
                  <div className="space-y-4">
                    {content.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="text-slate-200 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Email Preview Card */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-violet-500/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                    {/* Mac-like Window Controls */}
                    <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    
                    {/* Email Content */}
                    <div className="p-6 space-y-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <div className="flex items-center text-sm border-b border-white/5 pb-3">
                        <span className="text-slate-500 w-16">To:</span>
                        <span className="text-slate-300">{content.email.to}</span>
                      </div>
                      <div className="flex items-center text-sm border-b border-white/5 pb-3">
                        <span className="text-slate-500 w-16">Subject:</span>
                        <span className="text-amber-400 font-medium">{content.email.subject}</span>
                      </div>
                      <div className="pt-2 text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                        {content.email.body}
                        <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse align-middle"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
