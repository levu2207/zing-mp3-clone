import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading/Loading'
import {
  addPlaySong,
  endLoadMusic,
  pauseSong,
  playSong,
  randomAction,
  repeatAction,
  startLoadMusic,
} from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'
import ProgressBar from './ProgressBar'

const AudioControl = () => {
  const currentSong = useSelector((state) => state.play.playItem)
  const listSong = useSelector((state) => state.play.playList)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const isRandom = useSelector((state) => state.play.isRandom)
  const isRepeat = useSelector((state) => state.play.isRepeat)
  const isLoadMusic = useSelector((state) => state.play.isLoadMusic)
  const dispatch = useDispatch()

  const handleMusicEnd = async () => {
    const audio = document.getElementById('audio')
    dispatch(pauseSong())

    // auto next
    if (isRepeat) {
      audio.currentTime = 0
      audio.play()
      dispatch(playSong())
    } else {
      if (isRandom) {
        dispatch(startLoadMusic())
        await randomSong(listSong, currentSong)
        dispatch(endLoadMusic())
      } else {
        dispatch(startLoadMusic())
        await nextSong(listSong, currentSong)
        dispatch(endLoadMusic())
      }
    }
  }

  const getSongSource = async (item) => {
    const data = await mp3Service.getSong(item.encodeId)
    if (data.err === 0) {
      const source = data.data['128']
      const newSong = {
        ...item,
        source,
      }

      dispatch(addPlaySong(newSong))
      return newSong
    } else if (data.err === -1110) {
      toast.error('Không load được link nhạc từ sever của mp3...do mình gà quá')
      return -1
    }
  }

  const randomSong = async (list, current) => {
    const audio = document.getElementById('audio')

    const currentIndex = list.findIndex((item) => item.encodeId === current.encodeId)
    let newIndex
    let newSong
    do {
      newIndex = Math.floor(Math.random() * list.length)
      newSong = await getSongSource(list[newIndex])
    } while (newIndex === currentIndex || newSong === -1)

    if (newSong !== -1) {
      audio.play()
      dispatch(playSong())
    } else {
      toast.error('load nhạc bị lỗi')
    }
  }

  const nextSong = async (list, current) => {
    const audio = document.getElementById('audio')
    audio.pause()
    dispatch(pauseSong())

    let index = list.findIndex((item) => item.encodeId === current.encodeId)
    let newSong

    // if(index < 0) index = 0
    do {
      if (index >= list.length - 1) {
        index = 0
        newSong = await getSongSource(list[index])
      } else {
        index++
        newSong = await getSongSource(list[index])
      }
    } while (newSong === -1)

    if (newSong !== -1) {
      audio.play()
      dispatch(playSong())
    } else {
      toast.error('load nhạc bị lỗi')
    }
  }

  const prevSong = async (list, current) => {
    const audio = document.getElementById('audio')
    audio.pause()
    dispatch(pauseSong())

    let index = list.findIndex((item) => item.encodeId === current.encodeId)
    let newSong

    do {
      if (index === 0) {
        index = list.length - 1
        newSong = await getSongSource(list[index])
      } else {
        index--
        newSong = await getSongSource(list[index])
      }
    } while (newSong === -1)

    if (newSong !== -1) {
      audio.play()
      dispatch(playSong())
    } else {
      toast.error('load nhạc bị lỗi')
    }
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

  const handlePrev = async (e) => {
    dispatch(startLoadMusic())
    await prevSong(listSong, currentSong)
    dispatch(endLoadMusic())
  }

  const handleNext = async (e) => {
    dispatch(startLoadMusic())
    await nextSong(listSong, currentSong)
    dispatch(endLoadMusic())
  }

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
        <button className="audio-play relative" onClick={() => handlePlay()}>
          {isLoadMusic ? (
            <div className="w-full h-full absolute top-0 flex items-center justify-center">
              <Loading width="25px" height="25px" color="#9b4de0" />
            </div>
          ) : (
            ''
          )}
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
        <audio
          autoPlay
          onEnded={() => handleMusicEnd()}
          id="audio"
          src={currentSong.source}
        ></audio>
      </div>

      {/* progress bar */}
      <ProgressBar />
    </>
  )
}

export default AudioControl
