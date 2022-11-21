import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { addCurrentVideo } from '../../redux/reducers/videoSlice'
import mp3Service from '../../services/mp3Services'
import truncateText from '../../utils/truncateText'

const VideoPlayingItem = ({ item }) => {
  const currentVideo = useSelector((state) => state.video.currentVideo)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handlePlayVideo = (data) => {
    console.log('click')
    setLoading(true)
    mp3Service.getVideo(data.encodeId).then((res) => {
      console.log(res.data)
      dispatch(addCurrentVideo(res.data))
      setLoading(false)
    })
  }

  return (
    <>
      <div
        onClick={() => handlePlayVideo(item)}
        className={`list-playing-item ${
          item?.encodeId === currentVideo?.encodeId ? 'bg-hover-chart-bg' : ''
        } flex h-[76px] py-[5px] px-5 hover:bg-hover-chart-bg cursor-pointer`}
      >
        <div className="list-playing-img h-full relative rounded overflow-hidden">
          <img className="w-[120px] h-full rounded" src={item?.thumbnailM} alt="" />

          <div
            className={`list-playing-icon ${
              item?.encodeId === currentVideo?.encodeId ? 'opacity-70 bg-slate-800' : ''
            } w-full h-full absolute top-0 z-[1] text-[40px] flex justify-center items-center`}
          >
            {item?.encodeId === currentVideo?.encodeId ? (
              <span className="text-xs font-bold">Đang Phát</span>
            ) : loading ? (
              <Loading width="20px" height="20px" />
            ) : (
              <i className="fa-solid fa-play text-2xl hidden"></i>
            )}
          </div>
        </div>

        <div className="list-playing-info ml-3 flex flex-col justify-center">
          <p className="font-bold py-2">{truncateText(item?.title, 20)}</p>
          <span className="text-xs text-text-second">{item?.artists[0]?.name}</span>
        </div>
      </div>
    </>
  )
}

export default VideoPlayingItem
