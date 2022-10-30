import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import gifPlay from '../../assets/icon-playing.gif'
import { addPlaySong, pauseSong, playSong } from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'
import releaseDate from '../../utils/releaseDate'
import truncateText from '../../utils/truncateText'

const SongItem = ({ song }) => {
  const playItem = useSelector((state) => state.play.playItem)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const dispatch = useDispatch()

  const handlePlay = async (item) => {
    if (playItem.encodeId === item.encodeId) {
      if (isPlaying) {
        dispatch(pauseSong())
      } else {
        dispatch(playSong())
      }
    } else {
      const data = await mp3Service.getSong(item.encodeId)
      console.log(data)

      if (data.err === 0) {
        dispatch(addPlaySong(item))
      } else if (data.err < 0) {
        const newData = await axios.get(data.url)
        console.log(newData)
      }
    }
  }

  return (
    <div
      className={`song-item ${playItem.encodeId === song.encodeId ? 'active-play' : ''} p-2.5 flex`}
    >
      <div className="song-img w-[60px] h-[60px] mr-2.5 relative">
        <img className="w-full h-full rounded" src={song.thumbnail} alt="song" />
        <div
          onClick={() => handlePlay(song)}
          className="play-icon w-full h-full absolute top-0 z-10 flex justify-center items-center text-2xl "
        >
          {playItem.encodeId === song.encodeId && isPlaying ? (
            <img className="w-[18px] h-[18px]" src={gifPlay} alt="gifPlay" />
          ) : (
            <i
              className={`fa-solid fa-play ${
                playItem.encodeId === song.encodeId && !isPlaying ? '' : 'hidden'
              }`}
            />
          )}
        </div>
      </div>

      <div className="song-info">
        <p className="mb-1">{truncateText(song.title, 24)}</p>
        <p className="mb-1 text-xs text-[#FFFFFF80]">{truncateText(song.artistsNames, 24)}</p>
        <p className="text-xs text-[#FFFFFF80]">{releaseDate(song.releaseDate)}</p>
      </div>
    </div>
  )
}

export default SongItem
