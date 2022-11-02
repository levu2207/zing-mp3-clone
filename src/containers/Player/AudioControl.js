import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPlaySong,
  pauseSong,
  playSong,
  randomAction,
  repeatAction,
} from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'
import ProgressBar from './ProgressBar'
import { toast } from 'react-toastify'

const AudioControl = ({ song }) => {
  const listSong = useSelector((state) => state.play.playList)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const isRandom = useSelector((state) => state.play.isRandom)
  const isRepeat = useSelector((state) => state.play.isRepeat)
  const dispatch = useDispatch()

  const [percent, setPercent] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePercent = () => {
    const audio = document.getElementById('audio')
    setDuration(audio.duration)
    setCurrentTime(audio.currentTime)
    setPercent((audio.currentTime / audio.duration) * 100)

    // auto next
    if (audio.currentTime === audio.duration) {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        if (isRandom) {
          const newSong = randomSong(listSong, song)
          if (newSong.source) {
            dispatch(addPlaySong(newSong))
            audio.src = song.source
            audio.play()
            dispatch(playSong())
          } else {
            toast.error('load nhạc bị lỗi')
          }
        } else {
          nextSong(listSong, song)
          audio.src = song.source
          audio.play()
          dispatch(playSong())
        }
      }
    }
  }

  const getSongSource = (id) => {
    mp3Service.getSong(id).then((res) => {
      if (res.err === 0) {
        const source = res.data
        return Object.values(source)
      } else return -1
    })
  }

  const randomSong = (list, current) => {
    const currentIndex = list.findIndex((item) => item.id === current.id)
    let newIndex
    let linkMusic
    do {
      newIndex = Math.floor(Math.random() * list.length)
      linkMusic = getSongSource(list[newIndex].encodeId)
      console.log(linkMusic)
    } while (newIndex === currentIndex || linkMusic === -1)

    return {
      ...list[newIndex],
      source: linkMusic[0],
    }
  }

  const nextSong = (list, current) => {
    const index = list.findIndex((item) => item.id === current.id)
    if (index >= list.length - 1) {
    }
  }

  const prevSong = (list, current) => {
    const index = list.findIndex((item) => item.id === current.id)
    if (index === 0) {
      dispatch(addPlaySong(list[list.length - 1]))
    }
    dispatch(addPlaySong(list[index - 1]))
  }

  useEffect(() => {
    const audio = document.getElementById('audio')
    audio.pause()
    if (isPlaying) {
      dispatch(pauseSong())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePlay = () => {
    const audio = document.getElementById('audio')
    if (isPlaying) {
      audio.pause()
      dispatch(pauseSong())
    } else {
      audio.play()
      dispatch(playSong())
    }
  }

  const handleRandom = (e) => {
    dispatch(randomAction())
  }

  const handlePrev = (e) => {}

  const handleNext = (e) => {}

  const handleRepeat = (e) => {
    dispatch(repeatAction())
  }

  return (
    <>
      {/* audio control */}
      <div className="audio-control h-[50px] flex justify-center items-center text-white">
        <button onClick={(e) => handleRandom(e)} className="audio-shuffle audio-btn">
          <i className={`fa-solid fa-shuffle ${isRandom ? 'active-color' : ''}`}></i>
        </button>
        <button onClick={(e) => handlePrev(e)} className="audio-prev audio-btn">
          <i className="fa-solid fa-backward-step"></i>
        </button>
        <button className="audio-play" onClick={() => handlePlay()}>
          {isPlaying ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z" />
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
            </svg>
          )}
        </button>
        <button onClick={(e) => handleNext(e)} className="audio-next audio-btn">
          <i className="fa-solid fa-forward-step"></i>
        </button>
        <button onClick={(e) => handleRepeat(e)} className="audio-random audio-btn">
          <i className={`fa-solid fa-repeat ${isRepeat ? 'active-color' : ''}`}></i>
        </button>
      </div>
      {/* audio player */}
      <div id="playMusic">
        <audio autoPlay onTimeUpdate={() => handlePercent()} id="audio" src={song.source}></audio>
      </div>

      {/* progress bar */}
      <ProgressBar percent={percent} totalTimeAudio={duration} currentTimeAudio={currentTime} />
    </>
  )
}

export default AudioControl
