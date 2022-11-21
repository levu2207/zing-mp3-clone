import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideVideoModal } from '../../redux/reducers/videoSlice'
import ListVideoPlaying from './ListVideoPlaying'
import VideoPlayer from './VideoPlayer'
import { Row, Col } from 'antd'
import VideoItem from './VideoItem'

const DetailVideo = () => {
  const showVideoModal = useSelector((state) => state.video.showVideoModal)
  const currentVideo = useSelector((state) => state.video.currentVideo)
  const dispatch = useDispatch()

  return (
    <div className={`video-modal ${showVideoModal ? 'translate-y-0' : ''}`}>
      <div className="video-wrapper relative w-full h-full">
        {/* background blur */}
        <div className="video-bg-blur absolute"></div>
        <div
          className="video-bg-img absolute"
          style={{
            backgroundImage: `url(${currentVideo?.thumbnailM})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>

        {/* video modal content */}
        <div className="video-container overflow-x-hidden overflow-y-scroll">
          {/* video header */}
          <div className="video-header h-20 px-5 flex justify-between items-center">
            <div className="video-info h-full py-4 flex ">
              <img
                className="h-full rounded-full"
                src={currentVideo?.artists[0]?.thumbnail}
                alt=""
              />

              <div className="video-name flex flex-col justify-between ml-2">
                <span className="text-xl text-white font-bold">{currentVideo?.title}</span>
                <span className="text-text-second">{currentVideo?.artistsNames}</span>
              </div>
            </div>

            <div className="video-header-btn">
              <button className="download-video w-[44px] h-[44px] bg-text-chart-bg hover:bg-hover-chart-bg  text-white rounded-full mr-4">
                <a href={currentVideo?.streaming?.hls['720p']} target="_blank" rel="noreferrer">
                  <i className="fa-solid fa-download text-lg hover:text-white"></i>
                </a>
              </button>

              <button
                onClick={() => dispatch(hideVideoModal())}
                className="close-video-modal w-[44px] h-[44px] bg-text-chart-bg hover:bg-hover-chart-bg  text-white rounded-full "
              >
                <i className="fa-solid fa-chevron-down text-lg"></i>
              </button>
            </div>
          </div>

          {/* video body */}
          <div className="video-body mx-5 my-2.5 flex">
            {/* video player */}
            <div className="video-player px-[15px]">
              <VideoPlayer source={currentVideo?.streaming?.mp4['720p']} />
            </div>

            {/* video list playing */}
            <div className="video-queue w-[400px] px-[15px]">
              <div className="list-playing bg-text-chart-bg rounded-md h-full text-white">
                <div className="list-playing-header p-5">
                  <span className="text-lg font-medium">Danh Sách Phát</span>
                </div>

                <div className="list-playing-body w-full">
                  <div className="list-playing-scroll relative w-full h-full overflow-x-hidden overflow-y-scroll">
                    <div className="absolute w-full">
                      <ListVideoPlaying />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* video recommend */}
          <div className="video-recommend container-all bg-[#FFFFFF0D] h-[800px]">
            <div className="video-recommend-title py-5">
              <span className="text-xl text-white font-bold capitalize">Đề Xuất Cho Bạn</span>
            </div>

            <div className="video-recommend-list">
              <Row gutter={30}>
                {currentVideo?.recommends?.map((item) => (
                  <Col key={item.encodeId} span={24} md={12} lg={8} xl={6}>
                    <VideoItem item={item} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailVideo
