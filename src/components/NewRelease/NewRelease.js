import React, { useEffect } from 'react'
import { useState } from 'react'
import Tabs from '../Tabs/Tabs'
import Album from './Album'
import Song from './Song'
import './newRelease.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPlayList } from '../../redux/reducers/listSlice'

const NewRelease = () => {
  const dispatch = useDispatch()
  const newRelease = useSelector((state) => state.home.newRelease)
  const newReleaseList = newRelease.items
  const keys = Object.keys(newReleaseList)

  const tab1 = newReleaseList[keys[0]]
  const tab2 = newReleaseList[keys[1]]

  useEffect(() => {
    if (keys[0] === 'vPop') {
      dispatch(addPlayList(tab1))
    } else if (keys[1] === 'vPop') {
      dispatch(addPlayList(tab2))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys[0]])

  const [currentTab, setCurrentTab] = useState('1')

  const tabs = [
    {
      id: '1',
      tabTitle: keys[0] === 'vPop' || keys[0] === 'others' ? 'VIỆT NAM' : 'BÀI HÁT',
      value: '',
      name: 'tab1',
    },
    {
      id: '2',
      tabTitle: (keys[0] === 'vPop') | (keys[0] === 'others') ? 'QUỐC TẾ' : 'ALBUM',
      value: '',
      name: 'tab2',
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
      {keys[0] === 'song' || keys[0] === 'album' ? (
        <div className="new-release-content">
          <Tabs onClick={(e) => handleTabClick(e)} currentTab={currentTab} tabs={tabs} />
          <div className="content-info mt-4">
            {currentTab === '1' ? <Song songs={tab1} /> : <Album albums={tab2} />}
          </div>
        </div>
      ) : (
        <div className="new-release-content">
          <Tabs onClick={(e) => handleTabClick(e)} currentTab={currentTab} tabs={tabs} />
          <div className="content-info mt-4">
            {currentTab === '1' ? <Song songs={tab1} /> : <Song songs={tab2} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewRelease
