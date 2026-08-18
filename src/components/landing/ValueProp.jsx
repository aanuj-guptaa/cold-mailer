import React from 'react';

export const ValueProp = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="value-prop">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">ColdMailer</span>?
          </h2>
          <p 
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Stop wasting time on generic templates that get ignored. Let AI do the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Without ColdMailer Card */}
          <div className="rounded-3xl border border-red-500/20 bg-slate-900/50 backdrop-blur-xl p-8 relative group hover:border-red-500/30 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl pointer-events-none"></div>
            <h3 
              className="text-2xl font-bold text-slate-300 mb-6 flex items-center gap-3"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <span className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </span>
              Without ColdMailer
            </h3>
            
            <ul className="space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              {[
                "Generic copy-paste templates",
                "No personalization for company/role",
                "Low open rates, sent to spam",
                "Hours spent crafting each email",
                "No follow-up strategy"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-400">
                  <span className="text-red-400/80 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With ColdMailer Card */}
          <div className="rounded-3xl border border-amber-500/30 bg-[#111827]/80 backdrop-blur-xl p-8 relative group hover:border-amber-400/50 transition-all duration-300 transform md:-translate-y-2 shadow-[0_0_40px_-15px_rgba(250,204,21,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-green-500/5 rounded-3xl pointer-events-none"></div>
            
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg" style={{ fontFamily: "'Inter', sans-serif" }}>
              Recommended
            </div>

            <h3 
              className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <span className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </span>
              With ColdMailer
            </h3>
            
            <ul className="space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
              {[
                "AI-crafted, hyper-personalized emails",
                "Company & role-aware context",
                "85%+ open rate optimization",
                "Generate in seconds, not hours",
                "Smart follow-up generation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-200">
                  <span className="text-green-400 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
