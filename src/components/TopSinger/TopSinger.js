import React from 'react'
import { useSelector } from 'react-redux'
import Singer from './Singer'
import './topSinger.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const TopSinger = () => {
  const singer = useSelector((state) => state.home.topSinger)
  const singerItems = singer.items

  return (
    <div className="zm-singer mt-12">
      <div className="singer-container">
        <div className="singer-title text-xl font-bold text-white mb-5">
          <p>{singer.title}</p>
        </div>

        <div className="singer-content">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            navigation
          >
            {singerItems.map((item) => (
              <SwiperSlide key={item.encodeId}>
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
