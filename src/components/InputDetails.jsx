import React, { useState, useRef } from 'react'

const toneOptions = ['Professional', 'Friendly', 'Formal', 'Casual', 'Enthusiastic']

export default function InputDetails({ form, setForm, onGenerate, loading, dark, resumeFile, onResumeUpload, onResumeClear, resumeUploading }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const fileInputRef = useRef(null)
    const [dragOver, setDragOver] = useState(false)

    const border = dark ? '#35332a' : '#000'
    const shadow = dark ? '4px 4px 0px 0px #35332a' : '4px 4px 0px 0px #000'
    const inShadow = dark ? '2px 2px 0px 0px #35332a' : '2px 2px 0px 0px #000'
    const bg = dark ? '#232219' : '#fff'
    const inputBg = dark ? '#1c1b14' : '#fff'
    const inputBgBlue = dark ? '#1c1b14' : '#eff6ff'
    const text = dark ? '#e8e2d5' : '#000'
    const label = dark ? '#6b6755' : '#374151'

    const handleFileDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer?.files?.[0]
        if (file) onResumeUpload(file)
    }

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0]
        if (file) onResumeUpload(file)
        // Reset input so the same file can be re-selected
        e.target.value = ''
    }

    return (
        <div
            className="w-full md:w-[340px] shrink-0 p-5 sm:p-6 border-4 transition-all duration-200 hover:shadow-[6px_6px_0px_0px]"
            style={{ background: bg, borderColor: border, boxShadow: shadow, color: text }}
        >
            <h2 className="text-base font-bold tracking-widest uppercase mb-6">Input Details</h2>

            {/* Resume Upload */}
            <div className="mb-5">
                <label className="block text-[10px] tracking-widest uppercase mb-1.5 font-bold" style={{ color: label }}>Resume (PDF)</label>

                {resumeFile ? (
                    /* ── Uploaded state ── */
                    <div
                        className="flex items-center justify-between gap-2 px-3 py-2.5 border-2 text-sm"
                        style={{ borderColor: dark ? '#4a6741' : '#16a34a', background: dark ? '#1e2a1a' : '#f0fdf4', boxShadow: inShadow }}
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill={dark ? '#6ee7b7' : '#16a34a'}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate" style={{ color: dark ? '#6ee7b7' : '#16a34a', fontWeight: 600 }}>
                                {resumeFile}
                            </span>
                        </div>
                        <button
                            onClick={onResumeClear}
                            className="shrink-0 p-0.5 cursor-pointer hover:scale-110 transition-transform"
                            style={{ background: 'none', border: 'none', color: dark ? '#e8e2d5' : '#374151' }}
                            title="Remove resume"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    /* ── Drop zone ── */
                    <div
                        className="relative border-2 border-dashed cursor-pointer transition-all duration-200"
                        style={{
                            borderColor: dragOver
                                ? (dark ? '#facc15' : '#ca8a04')
                                : (dark ? '#35332a' : '#d1d5db'),
                            background: dragOver
                                ? (dark ? 'rgba(250,204,21,0.08)' : 'rgba(250,204,21,0.06)')
                                : (dark ? '#1c1b14' : '#fafaf9'),
                            padding: '16px 12px',
                            textAlign: 'center',
                        }}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleFileDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        {resumeUploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: dark ? '#facc15' : '#ca8a04' }}>
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: dark ? '#facc15' : '#ca8a04' }}>
                                    Parsing resume...
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={dark ? '#6b6755' : '#9ca3af'} strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: label }}>
                                    Drop PDF or click to upload
                                </span>
                                <span className="text-[10px]" style={{ color: dark ? '#4a4838' : '#9ca3af' }}>
                                    Max 5 MB
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Company Name */}
            <div className="mb-4">
                <label className="block text-[10px] tracking-widest uppercase mb-1.5 font-bold" style={{ color: label }}>Company Name</label>
                <input
                    type="text" name="companyName" value={form.companyName} onChange={handleChange}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-2 text-sm focus:outline-none border-2 transition-transform duration-200 focus:-translate-y-[2px]"
                    style={{ background: inputBgBlue, borderColor: border, color: text, boxShadow: inShadow }}
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

            {/* Candidate Background (Additional Notes) */}
            <div className="mb-4">
                <div className="flex justify-between items-end mb-1.5">
                    <label className="block text-[10px] tracking-widest uppercase font-bold" style={{ color: label }}>
                        {resumeFile ? 'Additional Notes' : 'Candidate Background'}
                    </label>
                    <span className="text-[10px] font-bold" style={{ color: form.background.length === 250 ? (dark ? '#fca5a5' : '#ef4444') : label }}>
                        {form.background.length}/250
                    </span>
                </div>
                <textarea
                    name="background" value={form.background} onChange={handleChange}
                    maxLength={250}
                    rows={4} placeholder={resumeFile
                        ? "Optional: add extra context the AI should know (e.g. why you're excited about this company)"
                        : "e.g. 3rd year CS student with experience in React and Node.js..."
                    }
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
