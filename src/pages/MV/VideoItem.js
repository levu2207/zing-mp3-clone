import React from 'react'
import truncateText from './../../utils/truncateText'

const VideoItem = ({ item }) => {
  if (!item) return
  return (
    <div className="video-item text-white mb-[30px]">
      <div className="video-img overflow-hidden rounded-lg">
        <img src={item.thumbnailM} alt="" />
      </div>

      <div className="video-info h-[60px] py-2.5 flex ">
        <img className="h-full rounded-full" src={item.artist.thumbnail} alt="" />
        <div className="video-name flex flex-col justify-between ml-2">
          <span>{truncateText(item.title, 25)}</span>
          <span className="text-xs text-text-second">{truncateText(item.artistsNames, 25)}</span>
        </div>
      </div>
    </div>
  )
}

export default VideoItem
