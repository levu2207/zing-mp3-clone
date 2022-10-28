import React, { useEffect } from 'react'
import './tabs.css'

const Tabs = (props) => {
  const { onClick, currentTab, tabs } = props

  useEffect(() => {
    if (currentTab === '1') document.getElementById('1').classList.add('active-tabs')
  }, [currentTab])

  const handleTabClick = (e) => {
    document.querySelector('.tabs button.active-tabs')?.classList.remove('active-tabs')
    e.target.classList.add('active-tabs')
    onClick(e)
  }

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          className="text-xs"
          name={tab.name}
          key={tab.id}
          id={tab.id}
          value={tab.value}
          disabled={currentTab === `${tab.id}`}
          onClick={(e) => handleTabClick(e)}
        >
          {tab.tabTitle}
        </button>
      ))}
    </div>
  )
}

export default Tabs
