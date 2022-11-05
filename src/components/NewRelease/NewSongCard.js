import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import truncateText from '../../utils/truncateText'
import { toast } from 'react-toastify'
import {
  addPlaySong,
  endLoadMusic,
  pauseSong,
  playSong,
  startLoadMusic,
} from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import gifPlay from '../../assets/icon-playing.gif'
import { convertDate } from '../../utils/convertDate'

const NewSongCard = ({ item, index }) => {
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
      dispatch(startLoadMusic())

      // get source music
      if (item.source) {
        dispatch(playSong())
      } else {
        setLoadMusic(true)
        dispatch(addPlaySong(item))
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
          dispatch(endLoadMusic())
        })
      }
    }
  }

  return (
    <div className="section-new-song h-[150px] bg-[#FFFFFF1A] rounded p-1">
      <div className="new-song-card text-white p-2.5 grid grid-cols-12 gap-2">
        <div className="new-card-img relative col-span-5">
          <Link className="new-card-link" to="">
            <img className="w-[120px] h-[120px] rounded" src={item.thumbnail} alt="" />
          </Link>

          <div
            onClick={() => handlePlay(item)}
            className="play-icon text-white w-full h-full absolute top-0 z-10 flex justify-center items-center text-2xl "
          >
            {playItem.encodeId === item.encodeId && isPlaying ? (
              <img className="w-[18px] h-[18px]" src={gifPlay} alt="gifPlay" />
            ) : loadMusic ? (
              <Loading width="18px" height="18px" color="#FFFFFF" />
            ) : (
              <i
                className={`fa-solid fa-play ${
                  playItem.encodeId === item.encodeId && !isPlaying ? '' : 'hidden'
                }`}
              />
            )}
          </div>
        </div>

        <div className="new-card-content col-span-7 h-full w-full flex flex-col justify-between">
          <div className="card-content-top">
            <div className="mb-1 text-base font-bold">
              <Link to="" title={item.title}>
                {truncateText(item.title, 25)}
              </Link>
            </div>
            <p className="text-xs text-[hsla(0,0%,100%,0.5)]">
              {truncateText(item.artistsNames, 25)}
            </p>
          </div>

          <div className="card-content-bottom flex justify-between items-end">
            <span className="card-content-number">{`#${index}`}</span>
            <span className="card-content-date text-[hsla(0,0%,100%,0.5)]">
              {convertDate.releaseDateFormat(item.releaseDate * 1000)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewSongCard
