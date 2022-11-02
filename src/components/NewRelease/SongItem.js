import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import gifPlay from '../../assets/icon-playing.gif'
import { addPlaySong, pauseSong, playSong } from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'
import releaseDate from '../../utils/releaseDate'
import truncateText from '../../utils/truncateText'
import AddLibrary from '../AddLibrary/AddLibrary'
import Loading from '../Loading/Loading'
import Option from '../Option/Option'

const SongItem = ({ song, height = 'full', notDate = false, library, playList = false }) => {
  const [loadMusic, setLoadMusic] = useState(false)
  const playItem = useSelector((state) => state.play.playItem)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const dispatch = useDispatch()

  const handlePlay = (item) => {
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
      audio.pause()
      dispatch(pauseSong())

      // get source music
      if (item.source) {
        dispatch(addPlaySong(item))
        dispatch(playSong())
      } else {
        setLoadMusic(true)
        mp3Service.getSong(item.encodeId).then((res) => {
          if (res.err === 0) {
            const source = res.data['128']

            dispatch(
              addPlaySong({
                ...item,
                source,
              })
            )
          } else if (res.err === -1110) {
            toast.success('Không load được link nhạc từ sever của mp3...do mình gà quá')
          }

          audio.play()
          dispatch(playSong())
          setLoadMusic(false)
        })
      }
    }
  }

  return (
    <div
      className={`song-item h-full ${
        playItem.encodeId === song.encodeId ? (playList ? 'active-play-list' : 'active-play') : ''
      } p-2.5 flex justify-between`}
    >
      <div className="flex">
        <div className="song-img mr-2.5 relative">
          <img className={`h-${height} rounded`} src={song.thumbnail} alt="song" />
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
          {!notDate && <p className="text-xs text-[#FFFFFF80]">{releaseDate(song.releaseDate)}</p>}
        </div>
      </div>

      <div className="song-bonus items-center hidden">
        <AddLibrary className={library ? '' : 'hidden'} />
        <Option />
      </div>
    </div>
  )
}

export default SongItem
