import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeVolume,
  hideKaraoke,
  hidePlaylist,
  offMute,
  onMute,
  showKaraoke,
  showPlaylist,
} from '../../redux/reducers/playSlice'

const PlayerSub = () => {
  const volume = useSelector((state) => state.play.volume)
  const isMute = useSelector((state) => state.play.isMute)
  const show = useSelector((state) => state.play.showPlaylist)
  const isShowKaraoke = useSelector((state) => state.play.showKaraoke)
  const dispatch = useDispatch()

  const handleVolume = (e) => {
    const audio = document.getElementById('audio')
    const volumeSlider = document.querySelector('.volume-slider')
    const width = e.offsetX
    const volume = e.currentTarget
    const volumeSliderWidth = (width / volume.clientWidth) * 100
    volumeSlider.style.width = `${volumeSliderWidth}%`
    audio.volume = volumeSliderWidth / 100
    dispatch(changeVolume(volumeSliderWidth))
  }

  useEffect(() => {
    const volumeElement = document.getElementById('volume')
    volumeElement.addEventListener('click', handleVolume)

    return () => {
      volumeElement.removeEventListener('click', handleVolume)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const audio = document.getElementById('audio')
    const volumeSlider = document.querySelector('.volume-slider')

    if (isMute) {
      audio.volume = 0
      volumeSlider.style.width = 0
    } else {
      audio.volume = volume / 100
      volumeSlider.style.width = `${volume}%`
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMute, volume])

  const handleMute = () => {
    isMute ? dispatch(offMute()) : dispatch(onMute())
  }

  const handleShowPlaylist = () => {
    show ? dispatch(hidePlaylist()) : dispatch(showPlaylist())
  }

  const handleShowKaraoke = () => {
    isShowKaraoke ? dispatch(hideKaraoke()) : dispatch(showKaraoke())
  }

  return (
    <div className="player-sub flex items-center justify-end text-white">
      <button className="sub-item audio-btn">
        <i className="fa-solid fa-film"></i>
      </button>

      <button onClick={() => handleShowKaraoke()} className="sub-item karaoke audio-btn">
        <svg
          className="text-xl"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M388.938 29.47c-23.008 0-46.153 9.4-62.688 25.405 5.74 46.14 21.326 75.594 43.75 94.28 22.25 18.543 52.078 26.88 87.75 28.345 13.432-16.07 21.188-37.085 21.188-58 0-23.467-9.75-47.063-26.344-63.656C436 39.25 412.404 29.47 388.938 29.47zm-76.282 42.374c-8.808 14.244-13.75 30.986-13.75 47.656 0 23.467 9.782 47.063 26.375 63.656 16.595 16.594 40.19 26.375 63.658 26.375 18.678 0 37.44-6.196 52.687-17.093-31.55-3.2-59.626-12.46-81.875-31-23.277-19.397-39.553-48.64-47.094-89.593zm-27.78 67.72l-64.47 83.78c2.898 19.6 10.458 35.1 22.094 46.187 11.692 11.142 27.714 18.118 48.594 19.626l79.312-65.28c-21.2-3.826-41.14-14.11-56.437-29.407-14.927-14.927-25.057-34.286-29.095-54.907zM300 201.468a8 8 0 0 1 .03 0 8 8 0 0 1 .533 0 8 8 0 0 1 5.875 13.374l-34.313 38.78a8.004 8.004 0 1 1-12-10.593l34.313-38.78a8 8 0 0 1 5.562-2.78zM207.594 240L103 375.906c3.487 13.327 7.326 20.944 12.5 26.03 5.03 4.948 12.386 8.46 23.563 12.408l135.312-111.438c-17.067-3.61-31.595-11.003-42.906-21.78-11.346-10.81-19.323-24.827-23.876-41.126zM95.97 402.375c-9.12 5.382-17.37 14.08-23.126 24.406-9.656 17.317-11.52 37.236-2.25 50.47 6.665 4.337 10.566 4.81 13.844 4.344 1.794-.256 3.618-.954 5.624-1.875-3.18-9.575-6.3-20.93-2.5-33.314 3.03-9.87 10.323-19.044 23.47-27.5-2.406-1.65-4.644-3.49-6.75-5.562-3.217-3.163-5.94-6.78-8.313-10.97z" />
        </svg>
      </button>

      <div className="music-volume flex items-center">
        <button onClick={() => handleMute()} className="sub-item audio-btn">
          {isMute ? (
            <i className="fa-solid fa-volume-xmark"></i>
          ) : (
            <i className="fa-solid fa-volume-high"></i>
          )}
        </button>

        <div id="volume" className="volume-bar">
          <div className="volume-slider">
            <div className="volume-dot"></div>
          </div>
        </div>

        <span className="divide h-[33px] w-[1px] mx-5 bg-text-chart-bg hidden"></span>

        <button
          onClick={() => {
            handleShowPlaylist()
          }}
          className={`playlist-btn py-1 px-[7px]  rounded ${
            show ? 'bg-purple' : 'bg-text-chart-bg'
          } hidden`}
        >
          <i className="fa-solid fa-list"></i>
        </button>
      </div>
    </div>
  )
}

export default PlayerSub
