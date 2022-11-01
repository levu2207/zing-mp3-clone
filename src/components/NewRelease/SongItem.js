import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import gifPlay from '../../assets/icon-playing.gif'
import gifLoading from '../../assets/loading.gif'
import { addPlaySong, pauseSong, playSong } from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'
import releaseDate from '../../utils/releaseDate'
import truncateText from '../../utils/truncateText'
import Loading from '../Loading/Loading'

const SongItem = ({ song }) => {
  const [loadMusic, setLoadMusic] = useState(false)
  const playItem = useSelector((state) => state.play.playItem)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const dispatch = useDispatch()

  const handlePlay = async (item) => {
    const audio = document.getElementById('audio')
    if (playItem.encodeId === item.encodeId) {
      if (isPlaying) {
        audio.pause()
        dispatch(pauseSong())
      } else {
        audio.play()
        dispatch(playSong())
      }
    } else {
      dispatch(pauseSong())
      audio.pause()
      setLoadMusic(true)

      const data = await mp3Service.getSong(item.encodeId)

      if (data.err === 0) {
        const source = data.data['128']
        console.log('source', source)

        dispatch(
          addPlaySong({
            ...item,
            source,
          })
        )
        audio.play()
        dispatch(playSong())
        setLoadMusic(false)
      } else {
        const newData = await axios.get(data.url)
        if (newData.err === 0) {
          console.log('reload-source', newData)

          const newSource = newData.data['128']
          dispatch(
            addPlaySong({
              ...item,
              source: newSource,
            })
          )

          audio.play()
          dispatch(playSong())
          setLoadMusic(false)
        } else {
          setLoadMusic(false)
          audio.play()
          dispatch(playSong())
        }
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
          ) : loadMusic ? (
            <Loading width="18px" height="18px" color="#FFFFFF" />
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
