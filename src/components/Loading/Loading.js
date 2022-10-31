import React from 'react'

const Loading = ({ width, height, color }) => {
  return (
    <div
      className={`loading w-[${width}] h-[${height}] border-2 rounded-full border-[${color}] border-r-transparent animate-spin`}
    ></div>
  )
}

export default Loading
