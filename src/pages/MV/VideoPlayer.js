import React, { useRef } from 'react'
import VideoJS from './VideoJS'

const VideoPlayer = ({ source }) => {
  const playerRef = useRef(null)

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: source,
        type: 'video/mp4',
      },
    ],
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player
  }

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
}

export default VideoPlayer
