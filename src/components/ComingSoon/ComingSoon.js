import React from 'react'
import emptyImage from '../../assets/img/empty-fav-song-dark.png'
import './comingSoon.css'

const ComingSoon = () => {
  return (
    <div className="coming-soon mt-16 text-text-second flex flex-col items-center justify-center text-lg">
      <div className="empty-img mb-3">
        <img className="w-32 h-32" src={emptyImage} alt="" />
      </div>
      <span>Tính năng đang phát triển</span>
    </div>
  )
}

export default ComingSoon
