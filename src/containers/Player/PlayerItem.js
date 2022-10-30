import React from 'react'
import { useSelector } from 'react-redux'
import AddLibrary from '../../components/AddLibrary/AddLibrary'
import Option from '../../components/Option/Option'
import truncateText from '../../utils/truncateText'

const PlayerItem = () => {
  const song = useSelector((state) => state.play.playItem)

  return (
    <div className="player-item flex items-center">
      <div className="player-item-img w-[64px] h-[64px] mr-2.5 relative">
        <img className="w-full h-full rounded" src={song.thumbnail} alt="song" />
      </div>

      <div className="song-info flex flex-col justify-center">
        <p className="mb-1 text-white font-normal">{truncateText(song.title, 24)}</p>
        <p className="mb-1 text-xs text-[#FFFFFF80]">{truncateText(song.artistsNames, 24)}</p>
      </div>

      <AddLibrary />

      <Option />
    </div>
  )
}

export default PlayerItem
