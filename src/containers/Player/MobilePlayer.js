import React, { useEffect } from 'react'
import PlayerItem from './PlayerItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPlaySong,
  endLoadMusic,
  hideKaraoke,
  pauseSong,
  playSong,
  showKaraoke,
  startLoadMusic,
} from '../../redux/reducers/playSlice'
import { toast } from 'react-toastify'
import mp3Service from '../../services/mp3Services'
import Loading from '../../components/Loading/Loading'

const MobilePlayer = () => {
  const song = useSelector((state) => state.play.playItem)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const playList = useSelector((state) => state.play.playList)
  const currentSong = useSelector((state) => state.play.playItem)
  const isLoading = useSelector((state) => state.play.isLoadMusic)
  const isShowKaraoke = useSelector((state) => state.play.showKaraoke)

  const dispatch = useDispatch()

  const audioOnPlay = () => {
    console.log('dang play')
    // const cdThumb = document.querySelector('.player-item-img img')
    // if (cdThumb) {
    //   const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
    //     duration: 10000,
    //     iterations: Infinity,
    //   })
    //   cdThumbAnimate.pause()

    //   if (isPlaying) {
    //     cdThumbAnimate.play()
    //   } else {
    //     cdThumbAnimate.pause()
    //   }
    // }
  }

  useEffect(() => {
    const audio = document.getElementById('audio')
    if (audio) {
      audio.addEventListener('onplay', audioOnPlay)
    }

    return () => {
      audio.removeEventListener('onplay', audioOnPlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const nextSong = async (list, current) => {
    const audio = document.getElementById('audio')
    audio.pause()
    dispatch(pauseSong())

    let index = list.findIndex((item) => item.encodeId === current.encodeId)
    let newSong

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

  const handlePlayMobile = () => {
    const audio = document.getElementById('audio')
    if (audio) {
      if (isPlaying) {
        audio.pause()
        dispatch(pauseSong())
      } else {
        audio.play()
        dispatch(playSong())
      }
    } else toast.success('Không tìm thấy audio element')
  }

  const handleNextMobile = async () => {
    dispatch(startLoadMusic())
    await nextSong(playList, currentSong)
    dispatch(endLoadMusic())
  }

  const handleShowKaraoke = () => {
    isShowKaraoke ? dispatch(hideKaraoke()) : dispatch(showKaraoke())
  }

  return (
    <div className="mobile-player h-[60px] fixed z-50 left-0 right-0 bottom-[60px] bg-mobile-menu hidden border-b border-border-bg">
      <div className="mobile-player-wrapper h-full flex items-center justify-between px-2">
        <PlayerItem song={song} className="w-[46px] h-[46px] rounded-full" numberText={18} />

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
