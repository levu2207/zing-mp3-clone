import React, { useEffect } from 'react'

import './banner.css'

const Banner = ({ banner }) => {
  const bannerList = banner.items

  useEffect(() => {
    const autoBanner = setInterval(() => {
      const listBanner = document.querySelectorAll('.gallery-item')
      if (listBanner) document.getElementById('banner-slider').appendChild(listBanner[0])
    }, 5000)

    return () => {
      clearInterval(autoBanner)
    }
  }, [])

  const handlePrev = () => {
    const list = document.querySelectorAll('.gallery-item')
    if (list) document.getElementById('banner-slider').prepend(list[list.length - 1])
  }

  const handleNext = () => {
    const list = document.querySelectorAll('.gallery-item')
    if (list) document.getElementById('banner-slider').appendChild(list[0])
  }

  const handleClickBanner = (item) => {
    console.log('click banner')
  }

  return (
    <div className="gallery py-8">
      <div onClick={() => handlePrev()} id="banner-prev">
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div id="banner-slider" className="gallery-container">
        {bannerList.map((item) => (
          <div key={item.encodeId} className="gallery-item" onClick={() => handleClickBanner(item)}>
            <img src={item.banner} alt="banner" />
          </div>
        ))}
      </div>
      <div onClick={() => handleNext()} id="banner-next">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  )
}

export default Banner
