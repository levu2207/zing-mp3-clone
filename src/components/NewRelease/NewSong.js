import React from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import NewSongCard from './NewSongCard'
import { Link } from 'react-router-dom'

const NewSong = ({ section }) => {
  const sectionItems = section.items

  return (
    <div className="zm-section mt-12">
      <div className="section-container">
        <div className="section-title text-xl font-bold text-white mb-5">
          <p>{section.title}</p>
        </div>
        <div className="section-content">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            navigation
          >
            {sectionItems.map((item, index) => (
              <SwiperSlide key={item.encodeId}>
                <NewSongCard item={item} index={index + 1} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className="bg-[#FFFFFF1A] w-full h-[150px] rounded flex justify-center items-center text-white text-base">
                <Link to="" className="view-all">
                  Xem tất cả
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default NewSong
