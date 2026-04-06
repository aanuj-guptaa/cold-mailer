import React, { useState } from 'react'

export default function GeneratedEmail({ emailData, loading, onRegenerate, onFollowup, followupLoading, dark }) {
    const [copied, setCopied] = useState(false)
    const [sendOpen, setSendOpen] = useState(false)

    const handleCopy = () => {
        if (!emailData) return
        navigator.clipboard.writeText(emailData.body)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSendDefault = () => {
        if (!emailData) return
        const subject = encodeURIComponent(emailData.subject)
        const body = encodeURIComponent(emailData.body)
        const to = emailData.recipient ? encodeURIComponent(emailData.recipient.trim()) : ''
        window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_self')
    }

    const handleSendGmail = () => {
        if (!emailData) return
        const subject = encodeURIComponent(emailData.subject)
        const body = encodeURIComponent(emailData.body)
        const to = emailData.recipient ? `&to=${encodeURIComponent(emailData.recipient.trim())}` : ''
        window.open(`https://mail.google.com/mail/?view=cm&fs=1${to}&su=${subject}&body=${body}`, '_blank')
    }

    const border = dark ? '#35332a' : '#000'
    const shadow = dark ? '4px 4px 0px 0px #35332a' : '4px 4px 0px 0px #000'
    const btnShadow = dark ? '2px 2px 0px 0px #35332a' : '2px 2px 0px 0px #000'
    const bg = dark ? '#232219' : '#fff'
    const cardBg = emailData
        ? (dark ? '#1e1d16' : 'linear-gradient(160deg, #fffef7 0%, #fff 100%)')
        : (dark ? '#1e1d16' : '#fff')
    const text = dark ? '#e8e2d5' : '#000'
    const subtext = dark ? '#6b6755' : '#9ca3af'
    const bodyText = dark ? '#c8c2b0' : '#1f2937'
    const divider = dark ? '#2e2c22' : '#fde047'
    const skeletonBg = dark ? '#2a2920' : '#e5e7eb'

    const btnHover = (e, on) => {
        e.currentTarget.style.background = on ? (dark ? '#2e2c22' : '#000') : 'transparent'
        e.currentTarget.style.color = on ? (dark ? '#e8e2d5' : '#fff') : text
        e.currentTarget.style.boxShadow = on
            ? (dark ? '3px 3px 0px 0px #4a4838' : '3px 3px 0px 0px #000')
            : btnShadow
    }

    return (
        <div
            className="flex-1 p-5 sm:p-6 min-w-0 border-4 transition-all duration-200"
            style={{ background: bg, borderColor: border, boxShadow: shadow, color: text }}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-base font-bold tracking-widest uppercase">Generated Email</h2>
                <div className="flex flex-wrap items-center gap-2">
                    {emailData && !loading && (
                        <button
                            onClick={onRegenerate}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-widest uppercase border-2 transition-all duration-200 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 hover:-translate-y-[2px]"
                            style={{ borderColor: border, color: text, background: 'transparent', boxShadow: btnShadow }}
                            onMouseEnter={e => btnHover(e, true)}
                            onMouseLeave={e => btnHover(e, false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Regenerate
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        disabled={!emailData}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-widest uppercase border-2 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:translate-x-0.5 active:translate-y-0.5 hover:-translate-y-[2px]"
                        style={{ borderColor: border, color: text, background: 'transparent', boxShadow: btnShadow }}
                        onMouseEnter={e => !e.currentTarget.disabled && btnHover(e, true)}
                        onMouseLeave={e => !e.currentTarget.disabled && btnHover(e, false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setSendOpen(!sendOpen)}
                            disabled={!emailData}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-widest uppercase border-2 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:translate-x-0.5 active:translate-y-0.5 hover:-translate-y-[2px]"
                            style={{ borderColor: border, color: text, background: 'transparent', boxShadow: btnShadow }}
                            onMouseEnter={e => !e.currentTarget.disabled && btnHover(e, true)}
                            onMouseLeave={e => !e.currentTarget.disabled && btnHover(e, false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${sendOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {sendOpen && emailData && (
                            <div
                                className="absolute right-0 top-full mt-2 w-36 border-2 z-10 animate-fade-in-up transition-all duration-200"
                                style={{
                                    borderColor: border,
                                    background: bg,
                                    boxShadow: btnShadow,
                                }}
                            >
                                <button
                                    onClick={() => { handleSendDefault(); setSendOpen(false) }}
                                    className="block w-full text-left px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors"
                                    style={{ color: text }}
                                    onMouseEnter={e => e.currentTarget.style.background = dark ? '#2e2c22' : '#f5f0e8'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    Mail App
                                </button>
                                <div style={{ borderTop: `2px solid ${dark ? '#2e2c22' : '#e5e7eb'}` }} />
                                <button
                                    onClick={() => { handleSendGmail(); setSendOpen(false) }}
                                    className="block w-full text-left px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors"
                                    style={{ color: text }}
                                    onMouseEnter={e => e.currentTarget.style.background = dark ? '#2e2c22' : '#f5f0e8'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    Gmail Tab
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Email Card */}

            <div
                className="p-5 text-sm leading-relaxed min-h-[300px] border-2 transition-all duration-200"
                style={{ borderColor: border, boxShadow: '2px 2px 0px 0px ' + border, background: cardBg }}
            >
                {loading ? (
                    <div className="animate-pulse space-y-3 min-h-[260px] pt-2">
                        <div className="h-3 rounded w-1/4" style={{ background: skeletonBg }} />
                        <div className="h-4 rounded w-3/4" style={{ background: skeletonBg }} />
                        <hr className="my-4" style={{ borderColor: dark ? '#2a2920' : '#f3f4f6' }} />
                        <div className="h-3 rounded w-1/4 mb-3" style={{ background: skeletonBg }} />
                        {['w-full', 'w-5/6', 'w-full', 'w-4/6', 'w-full', 'w-3/4'].map((w, i) => (
                            <div key={i} className={`h-3 rounded ${w}`} style={{ background: skeletonBg }} />
                        ))}
                    </div>
                ) : emailData ? (
                    <>
                        <div className="mb-4">
                            <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: subtext }}>Subject</p>
                            <p className="font-bold text-sm" style={{ color: text }}>{emailData.subject}</p>
                        </div>
                        <hr className="mb-4" style={{ borderColor: divider }} />
                        <div className="mb-4">
                            <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: subtext }}>Email Body</p>
                            <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: bodyText }}>{emailData.body}</p>
                        </div>

                        {emailData.explanation?.length > 0 && (
                            <>
                                <hr className="mb-4" style={{ borderColor: divider }} />
                                <div
                                    className="p-3 border-l-4"
                                    style={{
                                        borderLeftColor: '#facc15',
                                        background: dark ? '#1e1d14' : '#fffdf0',
                                    }}
                                >
                                    <p className="text-[10px] tracking-widest uppercase mb-2.5 font-bold" style={{ color: dark ? '#6b6755' : '#a8955a' }}>
                                        ✦ Why this works
                                    </p>
                                    <ul className="space-y-1.5">
                                        {emailData.explanation.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: bodyText }}>
                                                <span className="mt-0.5 shrink-0 font-bold" style={{ color: '#facc15' }}>✓</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[260px] text-center">
                        <div className="mb-4 p-4 border-2 border-dashed rounded-full" style={{ borderColor: dark ? '#2e2c22' : '#e5e7eb' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: subtext, opacity: 0.6 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-xs tracking-widest uppercase font-bold" style={{ color: subtext }}>Your email will appear here</p>
                        <p className="text-xs mt-1" style={{ color: dark ? '#4a4838' : '#9ca3af' }}>Fill in the details and click Generate Email</p>
                    </div>
                )}
            </div>

            {/* Follow-up Button */}
            {
                emailData && !loading && !emailData.isFollowup && (
                    <button
                        onClick={onFollowup}
                        disabled={followupLoading}
                        className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold tracking-widest uppercase border-2 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-[2px] active:translate-x-0.5 active:translate-y-0.5"
                        style={{
                            borderColor: border,
                            color: text,
                            background: dark ? '#1e1d16' : '#fafaf8',
                            boxShadow: btnShadow,
                        }}
                        onMouseEnter={e => { if (!e.currentTarget.disabled) btnHover(e, true) }}
                        onMouseLeave={e => { if (!e.currentTarget.disabled) btnHover(e, false) }}
                    >
                        {followupLoading ? (
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )}
                        {followupLoading ? 'Generating Follow-up...' : 'Generate Follow-up Email (3–5 Days Later)'}
                    </button>
                )
            }

            {
                emailData?.isFollowup && (
                    <p className="mt-2 text-center text-[10px] tracking-widest uppercase font-bold" style={{ color: dark ? '#6b6755' : '#9ca3af' }}>
                        ↑ This is a follow-up email
                    </p>
                )
            }
        </div >
    )
}
