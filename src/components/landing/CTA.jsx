import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-24 relative bg-[#0B0F19] overflow-hidden">
      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-10 md:p-16 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Inner mesh texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
              Ready to Land Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Opportunity?</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Stop sending generic emails. Let AI craft the perfect cold outreach that actually gets replies.
            </p>
            
            <Link to="/generator" className="group cursor-pointer relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#0B0F19] bg-amber-400 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] no-underline" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="relative z-10 flex items-center gap-2">
                Start Generating Emails <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <p className="mt-6 text-sm text-slate-400 font-medium tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
              Free forever · No sign-up required · Powered by Gemini
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
