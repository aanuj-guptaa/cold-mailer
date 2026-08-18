import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "What is ColdMailer?",
    a: "ColdMailer is an AI-powered platform that generates personalized cold emails for students and job seekers. It uses Google's Gemini 1.5 Flash to create context-aware outreach emails."
  },
  {
    q: "Is it free to use?",
    a: "Yes! ColdMailer is completely free. Just enter your details and generate as many emails as you need."
  },
  {
    q: "How personalized are the emails?",
    a: "Extremely. The AI takes into account the specific company, role, your background, and chosen tone to craft unique emails every time."
  },
  {
    q: "Can I send emails directly from ColdMailer?",
    a: "ColdMailer integrates with Gmail — click 'Open in Gmail' and your email opens pre-filled with subject and body, ready to send."
  },
  {
    q: "What about follow-up emails?",
    a: "After generating your initial email, you can generate a contextual follow-up that references your original outreach for maximum impact."
  },
  {
    q: "Is my data stored anywhere?",
    a: "Email history is stored locally in your browser only. We don't store any personal data on our servers."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative bg-[#0B0F19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`bg-[#111827]/60 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-l-4 border-amber-500 border-y-white/10 border-r-white/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-white/5 hover:border-white/10'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-lg font-semibold text-white pr-8" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {faq.q}
                  </span>
                  <div className={`text-amber-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
