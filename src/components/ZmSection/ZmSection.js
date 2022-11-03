import React from 'react'
import { useSelector } from 'react-redux'
import ZmCard from './ZmCard'
import './zmSection.css'

const ZmSection = () => {
  const section = useSelector((state) => state.home.dayDes)
  const sectionItems = section.items

  return (
    <div className="zm-section mt-12">
      <div className="section-container">
        <div className="section-title text-xl font-bold text-white mb-5">
          <p>{section.title}</p>
        </div>
        <div className="section-content grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {sectionItems.map((item) => (
            <div key={item.encodeId} className="">
              <ZmCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ZmSection
