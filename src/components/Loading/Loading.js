import React from 'react'

const Loading = ({ width, height, color }) => {
  return (
    <div
      style={{
        width: `${width}`,
        height: `${height}`,
        borderColor: `${color}`,
        borderRightColor: 'transparent',
      }}
      className={`loading border-2 border-dotted rounded-full animate-spin`}
    ></div>
  )
}

export default Loading
