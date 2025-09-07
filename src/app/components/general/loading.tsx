import React from 'react'

export default function Loading() {
  return (
    <div className="text-white text-lg">
      <span>Loading</span>
      <span className="animate-ping ml-1">.</span>
      <span className="animate-ping ml-1 delay-150">.</span>
      <span className="animate-ping ml-1 delay-300">.</span>
    </div>
  )
}
