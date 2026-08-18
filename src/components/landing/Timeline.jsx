import React from 'react';
import { PenTool, Sliders, Sparkles, Rocket } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    title: "Enter Your Details",
    desc: "Tell us the company, role, and your background. The more context, the better the email."
  },
  {
    icon: Sliders,
    title: "Choose Your Tone",
    desc: "Select Professional for corporate, Bold for startups, or Friendly for casual outreach."
  },
  {
    icon: Sparkles,
    title: "AI Generates Email",
    desc: "Gemini 1.5 Flash crafts a personalized cold email with subject line and body in seconds."
  },
  {
    icon: Rocket,
    title: "Send & Follow Up",
    desc: "Open directly in Gmail or copy to clipboard. Generate a smart follow-up if needed."
  }
];

export const Timeline = () => {
  return (
    <section id="timeline" className="py-24 relative bg-[#0B0F19]">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Works</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            From blank page to inbox in under 60 seconds
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/0 via-amber-500/20 to-amber-500/0 transform -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">
                  {/* Timeline Node */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-[#111827] border-2 border-amber-500/30 text-amber-400 z-10 group-hover:border-amber-400 group-hover:scale-110 transition-all duration-300">
                    <span className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>{index + 1}</span>
                  </div>

                  {/* Left Content */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                    <div className="bg-[#111827]/80 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-amber-500/30 transition-colors duration-300 relative overflow-hidden group-hover:-translate-y-1 transform">
                      <div className={`absolute top-0 w-full h-1 bg-gradient-to-r ${isEven ? 'from-transparent to-amber-500/50 right-0' : 'from-amber-500/50 to-transparent left-0'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                        <div className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-[#0B0F19] font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                          <Icon size={24} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {step.title}
                      </h3>
                      <p className="text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
