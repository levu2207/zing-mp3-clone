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
  hideKaraoke,
  pauseSong,
  playSong,
  showKaraoke,
  startLoadMusic,
} from '../../redux/reducers/playSlice'
import api from '../../services/api'
import mp3Service from '../../services/mp3Services'
import { lyricsData } from '../../utils/lyricsData'
import PlayerItem from './PlayerItem'

const MobilePlayer = () => {
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const isRepeat = useSelector((state) => state.play.isRepeat)
  const isRandom = useSelector((state) => state.play.isRandom)
  const playList = useSelector((state) => state.list.playList)
  const currentSong = useSelector((state) => state.list.playItem)
  const isLoading = useSelector((state) => state.play.isLoadMusic)
  const isShowKaraoke = useSelector((state) => state.play.showKaraoke)

  const dispatch = useDispatch()
  const cdRef = useRef()
  const audioRef = useRef()

  useEffect(() => {
    const cdThumb = document.querySelector('.mobile-player-wrapper .player-item-img > img')
    if (cdThumb) {
      cdRef.current = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
        duration: 20000,
        iterations: Infinity,
        easing: 'linear',
      })
      cdRef.current.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlethumbRotate = () => {
    // thumb rotate
    cdRef.current.play()
  }

  const handlethumbStop = () => {
    // thumb stop
    cdRef.current.pause()
  }

  useEffect(() => {
    audioRef.current = document.getElementById('audio')

    audioRef.current.addEventListener('play', handlethumbRotate)
    audioRef.current.addEventListener('pause', handlethumbStop)

    return () => {
      audioRef.current.removeEventListener('play', handlethumbRotate)
      audioRef.current.removeEventListener('pause', handlethumbStop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    audioRef.current.pause()
    audioRef.current.src = ''
    dispatch(pauseSong())

    const currentIndex = list.findIndex((item) => item.encodeId === current.encodeId)
    let newIndex
    let newSong
    do {
      newIndex = Math.floor(Math.random() * list.length)
      newSong = await getSongSource(list[newIndex])
    } while (newIndex === currentIndex || newSong === -1)

    if (newSong !== -1) {
      audioRef.current.src = newSong.source
      dispatch(playSong())
      dispatch(addRecentList(newSong))
    } else {
      toast.error('load nhạc bị lỗi')
    }
  }

  const nextSong = async (list, current) => {
    audioRef.current.pause()
    audioRef.current.src = ''
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
      audioRef.current.src = newSong.source
      dispatch(playSong())
      dispatch(addRecentList(newSong))
    } else {
      toast.error('load nhạc bị lỗi')
    }
  }

  const handlePlayMobile = async () => {
    if (isPlaying) {
      audioRef.current.pause()
      dispatch(pauseSong())
    } else {
      if (audioRef.current.source !== '') {
        audioRef.current.play()
        dispatch(playSong())
        return
      }
      if (JSON.stringify(currentSong) === 'undefined' || JSON.stringify(currentSong) === '{}') {
        dispatch(addPlaySong(playList[0]))
      }
      dispatch(startLoadMusic())
      const newSong = await getSongSource(playList[0])

      if (newSong !== -1) {
        dispatch(addPlaySong(newSong))
        dispatch(addRecentList(newSong))
        audioRef.current.src = ''
        audioRef.current.src = newSong.source
        dispatch(playSong())
        dispatch(endLoadMusic())
      } else {
        await nextSong()
        dispatch(endLoadMusic())
      }
    }
  }

  const handleNextMobile = async () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0
    } else {
      dispatch(startLoadMusic())
      if (isRandom) {
        await randomSong(playList, currentSong)
        dispatch(endLoadMusic())
      } else {
        await nextSong(playList, currentSong)
        dispatch(endLoadMusic())
      }
    }
  }

  const handleShowKaraoke = () => {
    isShowKaraoke ? dispatch(hideKaraoke()) : dispatch(showKaraoke())
  }

  return (
    <div className="mobile-player h-[60px] fixed z-50 left-0 right-0 bottom-[60px] bg-mobile-menu hidden border-b border-border-bg">
      <div className="mobile-player-wrapper h-full flex items-center justify-between px-2">
        <PlayerItem song={currentSong} className="w-[46px] h-[46px] rounded-full" numberText={18} />

        <div className="flex items-center">
          <button
            onClick={() => handleShowKaraoke()}
            className="mobile-play-btn pr-3 text-white text-[20px]"
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
          <div className="mobile-play-btn text-white text-[20px]">
            <button className="py-4 px-3" onClick={() => handlePlayMobile()}>
              {isPlaying ? (
                <i className="fa-solid fa-pause text-[23px]"></i>
              ) : isLoading ? (
                <Loading width="18px" height="18px" color="#FFFFFF" />
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </button>
          </div>

          <div className="mobile-play-btn text-white text-[23px]">
            <button className="py-4 px-3" onClick={() => handleNextMobile()}>
              <i className="fa-solid fa-forward-step"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobilePlayer
