import React from 'react';

export const Features = () => {
  const features = [
    {
      title: "AI Email Generation",
      desc: "Powered by Gemini 1.5 Flash, generates context-aware emails that feel hand-written.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
      )
    },
    {
      title: "Tone Customization",
      desc: "Choose Professional, Bold, or Friendly tone to match your personality.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
      )
    },
    {
      title: "1-Click Gmail Export",
      desc: "Open Gmail with pre-filled subject and body, ready to send.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      )
    },
    {
      title: "Smart Follow-ups",
      desc: "Generate contextual follow-up emails based on your original outreach.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
      )
    },
    {
      title: "Email History",
      desc: "Track all generated emails with one-click restore for quick re-use.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      title: "Company-Aware AI",
      desc: "AI researches and personalizes for the specific company and role.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
      )
    }
  ];

  return (
    <section id="features" className="py-24 relative bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Powerful Features
          </h2>
          <p 
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Everything you need to write compelling, high-converting cold emails at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-8 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(250,204,21,0.2)]"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 
                className="text-xl font-bold text-white mb-3"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-slate-400 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
