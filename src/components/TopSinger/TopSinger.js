import React from 'react'
import { useSelector } from 'react-redux'
import Singer from './Singer'
import './topSinger.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const TopSinger = () => {
  const singer = useSelector((state) => state.home.topSinger)
  const singerItems = singer.items
  console.log(singerItems)

  return (
    <div className="zm-singer mt-12">
      <div className="singer-container">
        <div className="singer-title text-xl font-bold text-white mb-5">
          <p>{singer.title}</p>
        </div>

        <div className="singer-content">
          <Swiper spaceBetween={20} slidesPerView={4} navigation>
            {singerItems.map((item) => (
              <SwiperSlide key={item.encodeId} className="singer-item">
                <Singer item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default TopSinger
