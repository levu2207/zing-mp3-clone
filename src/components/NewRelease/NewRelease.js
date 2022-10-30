import React from 'react'
import { useState } from 'react'
import Tabs from '../Tabs/Tabs'
import Album from './Album'
import Song from './Song'
import './newRelease.css'
import { useSelector } from 'react-redux'

const NewRelease = () => {
  const newRelease = useSelector((state) => state.home.newRelease)

  const [newReleaseList] = newRelease.items
  const songs = newReleaseList.song
  const albums = newReleaseList.album

  const [currentTab, setCurrentTab] = useState('1')

  const tabs = [
    {
      id: '1',
      tabTitle: 'BÀI HÁT',
      value: '',
      name: 'song',
    },
    {
      id: '2',
      tabTitle: 'ALBUM',
      value: '',
      name: 'album',
    },
  ]

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id)
  }

  return (
    <div className="new-release">
      <div className="new-release-title">
        <p className="text-white text-xl font-bold mb-5">{newRelease.title}</p>
      </div>
      <div className="new-release-content">
        <Tabs onClick={(e) => handleTabClick(e)} currentTab={currentTab} tabs={tabs} />
        <div className="content-info mt-4">
          {currentTab === '1' ? <Song songs={songs} /> : <Album albums={albums} />}
        </div>
      </div>
    </div>
  )
}

export default NewRelease
