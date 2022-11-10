import React from 'react'
import './loader.css'

const LoadList = ({ className }) => {
  return (
    <div className="w-full h-[500px] flex justify-center items-center">
      <div className={`load-list ${className}`}></div>
    </div>
  )
}

export default LoadList
