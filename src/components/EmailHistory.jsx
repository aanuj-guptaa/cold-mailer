import React, { useState } from 'react'

function timeAgo(date) {
    const diff = Math.floor((Date.now() - date) / 1000)
    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return new Date(date).toLocaleDateString()
}

export default function EmailHistory({ history, onRestore, onDelete, onClear, dark }) {
    const [expanded, setExpanded] = useState(null)

    if (history.length === 0) return null

    const border = dark ? '#35332a' : '#000'
    const shadow = dark ? '3px 3px 0px 0px #35332a' : '3px 3px 0px 0px #000'
    const bg = dark ? '#232219' : '#fff'
    const text = dark ? '#e8e2d5' : '#000'
    const subtext = dark ? '#6b6755' : '#9ca3af'
    const divider = dark ? '#2a2920' : '#e5e7eb'
    const bodyText = dark ? '#c8c2b0' : '#374151'

    return (
        <div className="max-w-5xl mx-auto mt-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: subtext }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif", color: subtext }}>
                        History ({history.length})
                    </h3>
                </div>
                <button
                    onClick={onClear}
                    className="text-[10px] font-bold tracking-widest uppercase transition-colors duration-150 hover:text-red-400"
                    style={{ fontFamily: "'Inter', sans-serif", color: dark ? '#4a4838' : '#9ca3af' }}
                >
                    Clear all
                </button>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="border-2 transition-all duration-200 hover:-translate-y-[2px]"
                        style={{ background: bg, borderColor: border, boxShadow: shadow }}
                    >
                        {/* Row */}
                        <div
                            className="flex items-center justify-between px-4 py-3 cursor-pointer"
                            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                        >
                            <div className="flex-1 min-w-0 pr-4">
                                <p className="text-xs font-bold truncate" style={{ color: text }}>{item.subject}</p>
                                <p className="text-[10px] mt-0.5 tracking-wide" style={{ fontFamily: "'Inter', sans-serif", color: subtext }}>
                                    {item.companyName} · {item.role} · {timeAgo(item.timestamp)}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onRestore(item) }}
                                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 border-2 transition-all duration-200 hover:-translate-y-[2px]"
                                    style={{ borderColor: border, color: text, background: 'transparent', boxShadow: '2px 2px 0px 0px ' + border }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#18170f'; e.currentTarget.style.borderColor = dark ? '#b8960a' : '#000' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = text; e.currentTarget.style.borderColor = border }}
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}
                                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 border-2 transition-all duration-200 hover:-translate-y-[2px]"
                                    style={{ borderColor: border, color: dark ? '#f87171' : '#dc2626', background: 'transparent', boxShadow: '2px 2px 0px 0px ' + border }}
                                    onMouseEnter={e => { e.currentTarget.style.background = dark ? '#7f1d1d' : '#fee2e2'; e.currentTarget.style.borderColor = dark ? '#b91c1c' : '#b91c1c' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = border }}
                                >
                                    Delete
                                </button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded === item.id ? 'rotate-180' : ''}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                    style={{ color: subtext }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Expanded body */}
                        {expanded === item.id && (
                            <div className="px-4 pb-4 border-t-2 border-dashed" style={{ borderColor: divider }}>
                                <p className="text-[10px] tracking-widest uppercase mt-3 mb-2" style={{ color: subtext }}>Email Body</p>
                                <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: bodyText }}>{item.body}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
