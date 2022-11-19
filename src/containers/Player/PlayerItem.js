import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddLibrary from '../../components/AddLibrary/AddLibrary'
import Option from '../../components/Option/Option'
import truncateText from '../../utils/truncateText'
import checkIsFavorite from './../../utils/checkIsFavorite'

const PlayerItem = ({ song, className = '', animations, options = false, numberText }) => {
  const favoriteSongs = useSelector((state) => state.favorite.favoriteSongs)
  const navigate = useNavigate()

  const handleNavigateToArtist = (data) => {
    console.log(data.artists[0].link.slice(1, 7))
    if (data.artists[0].link.slice(1, 7) === 'nghe-si') {
      navigate(data.artists[0].link)
    }
    navigate(`/nghe-si${data.artists[0].link}`)
  }

  return (
    <>
      {song === undefined || JSON.stringify(song) === '{}' ? (
        <div></div>
      ) : (
        <div className="player-item flex items-center justify-start p-1">
          <div className="flex items-center">
            <div className="player-item-img mr-2.5 relative">
              <img className={className} src={song?.thumbnail} alt="song" />
            </div>

            <div className="song-info flex flex-col justify-center mr-5">
              <span className="mb-1 text-white font-normal">
                {truncateText(song?.title, numberText)}
              </span>
              <p
                onClick={() => handleNavigateToArtist(song)}
                className="mb-1 text-xs text-[#FFFFFF80] text-ellipsis hover:underline hover:cursor-pointer"
              >
                {truncateText(song?.artistsNames, numberText)}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <AddLibrary
              className="mr-2"
              song={song}
              isFavorited={checkIsFavorite(favoriteSongs, song)}
            />
            {options && <Option />}
          </div>
        </div>
      )}
    </>
  )
}

export default PlayerItem
