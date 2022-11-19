import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { convertDate } from '../../utils/convertDate'
import { useNavigate } from 'react-router-dom'

const ArtistList = ({ section }) => {
  const sectionItems = section.items
  const navigate = useNavigate()

  const handleNavigateToArtist = (data) => {
    navigate(`/nghe-si${data.link}`)
  }

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
              <SwiperSlide key={`${item.encodeId}${Math.random(16)}`}>
                <div
                  onClick={() => handleNavigateToArtist(item)}
                  className="slider-artist-item text-white flex flex-col items-center hover:cursor-pointer"
                >
                  <div className="slider-artist-img overflow-hidden rounded-full">
                    <img
                      src={item.thumbnailM}
                      alt=""
                      className="w-[220px] rounded-full hover:scale-110 transition-all duration-700"
                    />
                  </div>

                  <span className="mt-4 mb-2">{item.name}</span>

                  <span className="text-text-second text-xs">{`${convertDate.convertFollow(
                    item.totalFollow
                  )} quan tâm`}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ArtistList
