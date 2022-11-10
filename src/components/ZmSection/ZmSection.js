import React from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper'
import ZmCard from './ZmCard'
import './zmSection.css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'

const ZmSection = ({ section }) => {
  const sectionItems = section.items

  return (
    <div className="zm-section mt-12">
      <div className="section-container">
        <div className="section-title text-xl font-bold text-white mb-5">
          <p>{section.title}</p>
        </div>
        <div className="section-content">
          <Swiper
            module={[Navigation, Autoplay]}
            autoplay={{ delay: 1000 }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              390: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
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
          >
            {sectionItems.map((item) => (
              <SwiperSlide key={item.encodeId}>
                <ZmCard item={item} artistName={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ZmSection
