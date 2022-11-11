import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import gifPlay from '../../assets/icon-playing.gif'
import {
  addKaraoke,
  addLyrics,
  addPlaySong,
  addRecentList,
  clearKaraoke,
  clearLyrics,
} from '../../redux/reducers/listSlice'
import { endLoadMusic, pauseSong, playSong, startLoadMusic } from '../../redux/reducers/playSlice'
import api from '../../services/api'
import mp3Service from '../../services/mp3Services'
import { convertDate } from '../../utils/convertDate'
import { lyricsData } from '../../utils/lyricsData'
import truncateText from '../../utils/truncateText'
import Loading from '../Loading/Loading'

const NewSongCard = ({ item, index }) => {
  const [loadMusic, setLoadMusic] = useState(false)
  const playItem = useSelector((state) => state.list.playItem)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const dispatch = useDispatch()

  const handlePlay = async (item) => {
    const audio = document.getElementById('audio')
    if (playItem?.encodeId === item.encodeId) {
      if (isPlaying) {
        audio.pause()
        dispatch(pauseSong())
      } else {
        audio.play()
        dispatch(playSong())
      }
    } else {
      audio.pause()
      audio.src = ''
      dispatch(pauseSong())
      dispatch(startLoadMusic())

      // get source music
      setLoadMusic(true)
      dispatch(addPlaySong(item))

      const currentSong = mp3Service.getSong(item.encodeId)
      const currentLyrics = mp3Service.getLyrics(item.encodeId)
      await api.promise([currentSong, currentLyrics]).then(
        api.spread((...res) => {
          if (res[0].err === 0) {
            const source = res[0].data['128']

            const newSong = {
              ...item,
              source,
            }
            dispatch(addPlaySong(newSong))
            dispatch(addRecentList(newSong))

            if (res[1].err === 0) {
              if (res[1].data.file) {
                axios.get(`${res[1].data.file}`).then((res) => {
                  if (res) {
                    const lyrics = lyricsData.parseLyric(res.data)
                    dispatch(addLyrics(lyrics))
                  } else toast.success('Bài hát chưa có lyrics')
                })
              } else {
                dispatch(clearLyrics())
              }
              if (res[1].data.sentences) {
                dispatch(addKaraoke(res[1].data.sentences))
              } else {
                dispatch(clearKaraoke())
              }
            }
          } else if (res[0].err === -1110) {
            toast.success('Không load được link nhạc từ sever của mp3...do mình gà quá')
          }

          audio.src = playItem.source
          dispatch(playSong())
          setLoadMusic(false)
          dispatch(endLoadMusic())
          dispatch(addRecentList(playItem))
        })
      )
    }
  }

  return (
    <div className="section-new-song h-[150px] bg-[#FFFFFF1A] rounded p-1">
      <div className="new-song-card h-full text-white p-2.5 flex justify-between">
        <div className="new-card-img mr-4">
          <Link className="new-card-link relative" to="">
            <img className="w-[120px] h-[120px] rounded" src={item.thumbnail} alt="" />
            <div
              onClick={() => handlePlay(item)}
              className="play-icon text-white w-full h-full absolute top-0 z-10 flex justify-center items-center text-2xl "
            >
              {playItem?.encodeId === item.encodeId && isPlaying ? (
                <img className="w-[24px] h-[24px]" src={gifPlay} alt="gifPlay" />
              ) : loadMusic ? (
                <Loading width="24px" height="24px" color="#FFFFFF" />
              ) : (
                <i
                  className={`fa-solid fa-play ${
                    playItem?.encodeId === item.encodeId && !isPlaying ? '' : 'hidden'
                  }`}
                />
              )}
            </div>
          </Link>
        </div>

        <div className="new-card-content h-full w-full flex flex-col justify-between">
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
