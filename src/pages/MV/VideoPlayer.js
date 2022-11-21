import React, { useRef } from 'react'
import VideoJS from './VideoJS'
import videojs from 'video.js'

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

    player.on('ended', () => {
      videojs.log('end video')
    })
  }

  return <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
}

export default VideoPlayer
