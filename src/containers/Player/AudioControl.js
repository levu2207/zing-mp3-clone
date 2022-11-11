import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading/Loading'
import {
  addKaraoke,
  addLyrics,
  addPlaySong,
  addRecentList,
  clearKaraoke,
  clearLyrics,
} from '../../redux/reducers/listSlice'
import {
  endLoadMusic,
  pauseSong,
  playSong,
  randomAction,
  repeatAction,
  startLoadMusic,
} from '../../redux/reducers/playSlice'
import api from '../../services/api'
import mp3Service from '../../services/mp3Services'
import { lyricsData } from '../../utils/lyricsData'
import ProgressBar from './ProgressBar'

const AudioControl = () => {
  const currentSong = useSelector((state) => state.list.playItem)
  const listSong = useSelector((state) => state.list.playList)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const isRandom = useSelector((state) => state.play.isRandom)
  const isRepeat = useSelector((state) => state.play.isRepeat)
  const isLoadMusic = useSelector((state) => state.play.isLoadMusic)
  const dispatch = useDispatch()
  const audioRef = useRef()

  const handleMusicEnd = async () => {
    const audio = document.getElementById('audio')
    dispatch(pauseSong())
    audio.src = ''

    // auto next
    if (isRepeat) {
      audio.src = currentSong.source
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
    const currentSong = mp3Service.getSong(item.encodeId)
    const currentLyrics = mp3Service.getLyrics(item.encodeId)
    let newSong

    await api.promise([currentSong, currentLyrics]).then(
      api.spread((...res) => {
        if (res[0].err === 0) {
          const source = res[0].data['128']

          newSong = {
            ...item,
            source,
          }
          dispatch(addPlaySong(newSong))

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
        } else {
          toast.success('Không load được link nhạc từ sever của mp3...do mình gà quá')
          newSong = -1
        }
      })
    )
    return newSong
  }

  const randomSong = async (list, current) => {
    const audio = document.getElementById('audio')
    audio.pause()
    audio.src = ''
    dispatch(pauseSong())

    const currentIndex = list.findIndex((item) => item.encodeId === current.encodeId)
    let newIndex
    let newSong
    do {
      newIndex = Math.floor(Math.random() * list.length)
      newSong = await getSongSource(list[newIndex])
    } while (newIndex === currentIndex || newSong === -1)

    if (newSong !== -1) {
      audio.src = newSong.source
      dispatch(playSong())
      dispatch(addRecentList(newSong))
    } else {
      toast.error('load nhạc bị lỗi')
    }
  }

  const nextSong = async (list, current) => {
    const audio = document.getElementById('audio')
    audio.pause()
    audio.src = ''
    dispatch(pauseSong())

    let index = list.findIndex((item) => item.encodeId === current.encodeId)
    let newSong = 0

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
      audio.src = newSong.source
      dispatch(playSong())
      dispatch(addRecentList(newSong))
    } else {
      toast.error('load nhạc bị lỗi')
    }
  }

  const prevSong = async (list, current) => {
    const audio = document.getElementById('audio')
    audio.pause()
    audio.src = ''
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
      audio.src = newSong.source
      dispatch(playSong())
      dispatch(addRecentList(newSong))
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

  const handlePlay = async () => {
    const audio = document.getElementById('audio')
    if (isPlaying) {
      audio.pause()
      audio.src = ''
      dispatch(pauseSong())
    } else {
      if (listSong.length === 0) {
        toast.error('Vui lòng chọn bài hát!')
      }
      if (JSON.stringify(currentSong) === 'undefined' || JSON.stringify(currentSong) === '{}') {
        dispatch(addPlaySong(listSong[0]))
      }
      dispatch(startLoadMusic())
      const newSong = await getSongSource(listSong[0])

      if (newSong !== -1) {
        dispatch(addPlaySong(newSong))
        dispatch(addRecentList(newSong))
        audio.src = newSong.source
        dispatch(playSong())
        dispatch(endLoadMusic())
      } else {
        await nextSong()
        dispatch(endLoadMusic())
      }
    }
  }

  const handleRandom = () => {
    dispatch(randomAction())
  }

  const handlePrev = async () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0
    } else {
      dispatch(startLoadMusic())
      if (isRandom) {
        await randomSong(listSong, currentSong)
        dispatch(endLoadMusic())
      } else {
        await prevSong(listSong, currentSong)
        dispatch(endLoadMusic())
      }
    }
  }

  const handleNext = async () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0
    } else {
      dispatch(startLoadMusic())
      if (isRandom) {
        await randomSong(listSong, currentSong)
        dispatch(endLoadMusic())
      } else {
        await nextSong(listSong, currentSong)
        dispatch(endLoadMusic())
      }
    }
  }

  const handleRepeat = () => {
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
        <button
          className="audio-play relative flex items-center justify-center"
          onClick={() => handlePlay()}
        >
          {isLoadMusic ? (
            <div className="w-[40px] h-full absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <Loading width="25px" height="25px" color="#9b4de0" />
            </div>
          ) : isPlaying ? (
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
          ref={audioRef}
          autoPlay
          onEnded={() => handleMusicEnd()}
          id="audio"
          src={currentSong?.source || ''}
        ></audio>
      </div>

      {/* progress bar */}
      <ProgressBar />
    </>
  )
}

export default AudioControl
