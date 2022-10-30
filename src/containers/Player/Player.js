import React from 'react'
import AudioControl from './AudioControl'
import './player.css'
import PlayerItem from './PlayerItem'
import PlayerSub from './PlayerSub'

const Player = () => {
  return (
    <div className="player-wrapper fixed z-50 bottom-0 h-[90px] px-5 w-full bg-player-bg border-t border-border">
      <div className="player-container h-full flex justify-between items-center">
        <PlayerItem />
        <AudioControl />
        <PlayerSub />
      </div>
    </div>
  )
}

export default Player
