import React, { useEffect, useState } from 'react'
import AddLibrary from '../../components/AddLibrary/AddLibrary'
import Option from '../../components/Option/Option'
import truncateText from '../../utils/truncateText'
import { useSelector } from 'react-redux'
import checkIsFavorite from './../../utils/checkIsFavorite'

const PlayerItem = ({ song }) => {
  const favoriteSongs = useSelector((state) => state.favorite.favoriteSongs)

  return (
    <div className="player-item flex items-center justify-start">
      <div className="flex items-center">
        <div className="player-item-img mr-2.5 relative">
          <img className="rounded" src={song.thumbnail} alt="song" />
        </div>

        <div className="song-info flex flex-col justify-center mr-5">
          <p className="mb-1 text-white font-normal">{truncateText(song.title, 24)}</p>
          <p className="mb-1 text-xs text-[#FFFFFF80]">{truncateText(song.artistsNames, 24)}</p>
        </div>
      </div>
      <div className="flex items-center mr-4">
        <AddLibrary
          className={`mr-2 ${checkIsFavorite(favoriteSongs, song) ? 'bg-purple' : ''}`}
          song={song}
        />
        <Option />
      </div>
    </div>
  )
}

export default PlayerItem
