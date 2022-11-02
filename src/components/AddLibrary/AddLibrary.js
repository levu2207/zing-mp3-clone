import React from 'react'
import './library.css'

const AddLibrary = ({ className }) => {
  return (
    <div className={`add-library mr-3 ${className}`}>
      <i className="fa-regular fa-heart"></i>
    </div>
  )
}

export default AddLibrary
