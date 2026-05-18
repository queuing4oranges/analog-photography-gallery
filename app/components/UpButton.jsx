"use client"

import React from 'react'

export default function UpButton() {

  return (
    <button
      className="absolute flex items-center justify-center bottom-5 right-5 mx-5 w-10 h-10 bg-transparent text-white border border-white rounded-full"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth", })}
      title='Up up up'
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  )
}
