import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArtistItem = ({ artist }) => {
  const navigate = useNavigate()

  const handleLinkArtist = (data) => {
    navigate(data?.link)
  }

  return (
    <div
      onClick={() => handleLinkArtist(artist)}
      className="artist-item h-full w-full rounded-md p-2.5 flex justify-start items-center hover:bg-[#2a213a] hover:cursor-pointer"
    >
      <div className="artist-img h-full">
        <img className="h-full rounded-full" src={artist?.thumbnail} alt="artist" />
      </div>

      <div className="artist-info ml-3 flex flex-col justify-center">
        <span className="artist-name text-white">{artist?.name}</span>
        <span className="text-xs text-text-second">Nghệ sĩ</span>
      </div>
    </div>
  )
}

export default ArtistItem
