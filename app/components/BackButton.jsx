"use client"

import React from 'react'

export default function BackButton() {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-6">
      <a
        href="/"
        className="group inline-flex items-center gap-3 px-6 py-3 border transition-all duration-500 font-mono text-[11px] uppercase tracking-[0.3em]"
        rel='noopener noreferrer'
      >
        Back to Gallery
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" aria-hidden="true">
          <path d="M7 7h10v10"></path>
          <path d="M7 17 17 7"></path>
        </svg>
      </a>
    </div>
  )
}
