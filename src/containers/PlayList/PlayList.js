import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Option from '../../components/Option/Option'
import ListMusic from './ListMusic'
import './playList.css'

const PlayList = () => {
  const [tab, setTab] = useState('1')
  const listMusic = useSelector((state) => state.play.playList)
  const recentMusic = useSelector((state) => state.play.recentMusic)

  const handleTabClick = (e) => {
    setTab(e.target.id)
    document.querySelector('.left-item.active-list')?.classList.remove('active-list')
    e.target.classList.add('active-list')
  }

  return (
    <div
      id="playList"
      className="play-list w-[330px] fixed z-20 top-0 right-0 bottom-[90px] text-white text-xs border-l border-border"
    >
      {/* header */}
      <div className="play-list-header p-[14px] flex relative justify-around">
        <div className="header-left flex items-center p-[3px] rounded-full">
          <div
            id="1"
            onClick={(e) => handleTabClick(e)}
            className="left-item py-[6px] px-3 active-list"
          >
            Danh sách phát
          </div>
          <div id="2" onClick={(e) => handleTabClick(e)} className="left-item py-[6px] px-3">
            Nghe gần đây
          </div>
        </div>

        <div className="header-right">
          <Option className="is-hover" />
        </div>
      </div>
      {/* content */}
      <div className="play-list-content">
        {tab === '1' ? <ListMusic list={listMusic} /> : <ListMusic list={recentMusic} />}
      </div>
    </div>
  )
}

export default PlayList
