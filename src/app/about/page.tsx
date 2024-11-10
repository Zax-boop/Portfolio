import React from 'react'
import Header from '../components/header'

export default function About() {
  return (
    <div className='flex flex-col w-full h-full items-center'>
      <Header/>
      <div className='flex flex-col w-4/5'>
        <p>Extra</p>
      </div>
    </div>
  )
}