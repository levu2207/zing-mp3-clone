import React from 'react'
import { useSelector } from 'react-redux'
import VideoPlayingItem from './VideoPlayingItem'

const ListVideoPlaying = () => {
  const listVideo = useSelector((state) => state.video.videoList)

  return (
    <>
      {listVideo?.map((item) => (
        <div key={item.encodeId}>
          <VideoPlayingItem item={item} />
        </div>
      ))}
    </>
  )
}

export default ListVideoPlaying
