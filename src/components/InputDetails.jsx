import React, { useState } from 'react'

const toneOptions = ['Professional', 'Friendly', 'Formal', 'Casual', 'Enthusiastic']

export default function InputDetails({ form, setForm, onGenerate, loading, dark }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const border = dark ? '#35332a' : '#000'
    const shadow = dark ? '4px 4px 0px 0px #35332a' : '4px 4px 0px 0px #000'
    const inShadow = dark ? '2px 2px 0px 0px #35332a' : '2px 2px 0px 0px #000'
    const bg = dark ? '#232219' : '#fff'
    const inputBg = dark ? '#1c1b14' : '#fff'
    const inputBgBlue = dark ? '#1c1b14' : '#eff6ff'
    const text = dark ? '#e8e2d5' : '#000'
    const label = dark ? '#6b6755' : '#374151'
    const placeholder = dark ? '#4a4838' : undefined

    return (
        <div
            className="w-full md:w-[340px] shrink-0 p-5 sm:p-6 border-4 transition-all duration-200 hover:shadow-[6px_6px_0px_0px]"
            style={{ background: bg, borderColor: border, boxShadow: shadow, color: text }}
        >
            <h2 className="text-base font-bold tracking-widest uppercase mb-6">Input Details</h2>

            {/* Company Name */}
            <div className="mb-4">
                <label className="block text-[10px] tracking-widest uppercase mb-1.5 font-bold" style={{ color: label }}>Company Name</label>
                <input
                    type="text" name="companyName" value={form.companyName} onChange={handleChange}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-2 text-sm focus:outline-none border-2 transition-transform duration-200 focus:-translate-y-[2px]"
                    style={{ background: inputBgBlue, borderColor: border, color: text, boxShadow: inShadow, '--tw-placeholder-color': placeholder }}
                />
            </div>

            {/* Role */}
            <div className="mb-4">
                <label className="block text-[10px] tracking-widest uppercase mb-1.5 font-bold" style={{ color: label }}>Role</label>
                <input
                    type="text" name="role" value={form.role} onChange={handleChange}
                    placeholder="e.g. Software Engineer Intern"
                    className="w-full px-3 py-2 text-sm focus:outline-none border-2 transition-transform duration-200 focus:-translate-y-[2px]"
                    style={{ background: inputBg, borderColor: border, color: text, boxShadow: inShadow }}
                />
            </div>

            {/* Recipient Email */}
            <div className="mb-4">
                <label className="block text-[10px] tracking-widest uppercase mb-1.5 font-bold" style={{ color: label }}>Recipient Email (Optional)</label>
                <input
                    type="email" name="recipient" value={form.recipient} onChange={handleChange}
                    placeholder="e.g. recruiter@google.com"
                    className="w-full px-3 py-2 text-sm focus:outline-none border-2 transition-transform duration-200 focus:-translate-y-[2px]"
                    style={{ background: inputBg, borderColor: border, color: text, boxShadow: inShadow }}
                />
            </div>

            {/* Candidate Background */}
            <div className="mb-4">
                <div className="flex justify-between items-end mb-1.5">
                    <label className="block text-[10px] tracking-widest uppercase font-bold" style={{ color: label }}>Candidate Background</label>
                    <span className="text-[10px] font-bold" style={{ color: form.background.length === 250 ? (dark ? '#fca5a5' : '#ef4444') : label }}>
                        {form.background.length}/250
                    </span>
                </div>
                <textarea
                    name="background" value={form.background} onChange={handleChange}
                    maxLength={250}
                    rows={5} placeholder="e.g. 3rd year CS student with experience in React and Node.js..."
                    className="w-full px-3 py-2 text-sm resize-none focus:outline-none border-2 transition-transform duration-200 focus:-translate-y-[2px]"
                    style={{ background: inputBg, borderColor: border, color: text, boxShadow: inShadow }}
                />
            </div>

            {/* Tone */}
            <div className="mb-6">
                <label className="block text-[10px] tracking-widest uppercase mb-1.5 font-bold" style={{ color: label }}>Tone</label>
                <select
                    name="tone" value={form.tone} onChange={handleChange}
                    className="w-full px-3 py-2 text-sm focus:outline-none appearance-none cursor-pointer border-2 transition-transform duration-200 focus:-translate-y-[2px]"
                    style={{
                        background: inputBg, borderColor: border, color: text, boxShadow: inShadow,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='${dark ? '%236b6755' : 'black'}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
                    }}
                >
                    {toneOptions.map((t) => (
                        <option key={t} value={t} style={{ background: inputBg, color: text }}>{t}</option>
                    ))}
                </select>
            </div>

            {/* Generate Button */}
            <button
                onClick={onGenerate} disabled={loading}
                className="w-full px-4 py-3 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 border-2 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-[2px] active:translate-x-0.5 active:translate-y-0.5"
                style={{
                    background: '#facc15',
                    borderColor: dark ? '#b8960a' : '#000',
                    color: '#18170f',
                    boxShadow: dark ? '3px 3px 0px 0px #b8960a' : '3px 3px 0px 0px #000',
                }}
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                )}
                {loading ? 'Generating...' : 'Generate Email'}
            </button>
        </div>
    )
}
