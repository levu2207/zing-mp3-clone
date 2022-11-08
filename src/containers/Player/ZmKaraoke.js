import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideKaraoke } from '../../redux/reducers/playSlice'
import KaraokeTab from './KaraokeTab'
import LyricsTab from './LyricsTab'

const ZmKaraoke = ({ song }) => {
  const isShowKaraoke = useSelector((state) => state.play.showKaraoke)
  const dispatch = useDispatch()
  const [tabSelected, setTabSelected] = useState('tab 1')

  const handleCloseKaraoke = () => {
    dispatch(hideKaraoke())
  }

  const handleTabSelected = (e) => {
    setTabSelected(e.target.id)
    const tabs = document.querySelectorAll('.karaoke-btn.active')
    if (tabs) {
      tabs.forEach((tab) => tab.classList.remove('active'))
    }
    const isActive = e.target.classList.contains('active')
    if (!isActive) {
      e.target.classList.add('active')
    }
  }

  return (
    <>
      <div
        className={`zm-karaoke bg-bg fixed top-0 bottom-0 left-0 right-0 ${
          isShowKaraoke && 'translate-x-0'
        }`}
      >
        <div className="karaoke-wrapper w-full h-full relative">
          <div className="bg-blur-karaoke absolute"></div>
          <div className="karaoke-content px-5 flex flex-col items-center justify-between absolute top-0 left-0 right-0 bottom-[90px]">
            <div className="karaoke-header w-full pt-5 flex items-center justify-end relative">
              <div className="header-tabs absolute top-5 left-1/2 -translate-x-1/2 p-1 rounded-full bg-text-chart-bg text-text-second text-base font-semibold">
                <button
                  id="tab 1"
                  onClick={(e) => {
                    handleTabSelected(e)
                  }}
                  className="karaoke-btn hover:bg-hover-chart-bg  py-1 px-10 rounded-full mr-1"
                >
                  Karaoke
                </button>
                <button
                  id="tab 2"
                  onClick={(e) => {
                    handleTabSelected(e)
                  }}
                  className="karaoke-btn hover:bg-hover-chart-bg  py-1 px-10 rounded-full"
                >
                  Lời bài hát
                </button>
              </div>
              <button
                onClick={() => handleCloseKaraoke()}
                className="close-karaoke w-[44px] h-[44px] bg-text-chart-bg hover:bg-hover-chart-bg  text-white rounded-full justify-center items-center"
              >
                <i className="fa-solid fa-chevron-down text-lg"></i>
              </button>
            </div>

            <div className="karaoke-lyrics w-full h-full flex justify-center items-center text-white text-xl">
              {tabSelected === 'tab 1' ? <KaraokeTab /> : <LyricsTab song={song} />}
            </div>

            <div className="karaoke-info flex justify-center">
              <span className="text-white">{song.title}</span>
              <span className="text-white px-2"> - </span>
              <span className="text-text-second">{song.artistsNames}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ZmKaraoke
