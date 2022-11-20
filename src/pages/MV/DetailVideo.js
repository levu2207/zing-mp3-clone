import React from 'react'
import { useSelector } from 'react-redux'

const DetailVideo = () => {
  const currentVideo = useSelector((state) => state.video.currentVideo)
  return (
    <div className="video-modal">
      <div className="video-wrapper relative w-full h-full">
        <div className="video-bg-blur absolute"></div>
        <div
          className="video-bg-img absolute"
          style={{ backgroundImage: `url(${currentVideo?.thumbnailM})` }}
        ></div>
      </div>
    </div>
  )
}

export default DetailVideo
