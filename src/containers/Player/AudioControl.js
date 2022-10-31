import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pauseSong, playSong } from '../../redux/reducers/playSlice'
import ProgressBar from './ProgressBar'

const AudioControl = () => {
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const playItem = useSelector((state) => state.play.playItem)
  const dispatch = useDispatch()

  const [percent, setPercent] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePercent = () => {
    const audio = document.getElementById('audio')
    setDuration(audio.duration)
    setCurrentTime(audio.currentTime)
    setPercent((audio.currentTime / audio.duration) * 100)
  }

  useEffect(() => {
    if (isPlaying) {
      dispatch(pauseSong())
    }
    // isPlaying ? dispatch(playSong()) : dispatch(pauseSong())

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

  return (
    <>
      {/* audio control */}
      <div className="audio-control h-[50px] flex justify-center items-center text-white">
        <button className="audio-shuffle audio-btn">
          <i className="fa-solid fa-shuffle"></i>
        </button>
        <button className="audio-prev audio-btn">
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
        <button className="audio-next audio-btn">
          <i className="fa-solid fa-forward-step"></i>
        </button>
        <button className="audio-random audio-btn text-2xl">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={0}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3701 7.99993L13.8701 10.598V8.99993H6.88989V12.9999H4.88989V6.99993H13.8701V5.40186L18.3701 7.99993Z"
              fill="currentColor"
            />
            <path
              d="M10.1299 16.9999H19.1101V10.9999H17.1101V14.9999H10.1299V13.4019L5.62988 15.9999L10.1299 18.598V16.9999Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      {/* audio player */}
      <div id="playMusic">
        <audio
          autoPlay
          // onPlay={() => handlePlaying()}
          onTimeUpdate={() => handlePercent()}
          id="audio"
          src={playItem.source}
        ></audio>
      </div>

      {/* progress bar */}
      <ProgressBar percent={percent} totalTimeAudio={duration} currentTimeAudio={currentTime} />
    </>
  )
}

export default AudioControl
