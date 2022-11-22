import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { pauseSong } from '../../redux/reducers/playSlice'
import { addCurrentVideo, addVideoList, showVideoModal } from '../../redux/reducers/videoSlice'
import mp3Service from '../../services/mp3Services'
import truncateText from './../../utils/truncateText'

const VideoItem = ({ item }) => {
  const dispatch = useDispatch()
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const [loading, setLoading] = useState(false)

  const handlePlayVideo = async (target) => {
    if (isPlaying) {
      const audio = document.getElementById('audio')
      if (audio) audio.pause()
      dispatch(pauseSong())
    }
    setLoading(true)
    const { data } = await mp3Service.getVideo(target.encodeId)
    dispatch(addCurrentVideo(data))
    const payload = [data, ...data?.recommends]
    dispatch(addVideoList(payload))
    setLoading(false)
    dispatch(showVideoModal())
  }

  return (
    <div className="video-item text-white mb-[30px]">
      <div className="video-img overflow-hidden rounded-lg relative">
        <img src={item?.thumbnailM} alt="" />

        <div
          onClick={() => handlePlayVideo(item)}
          className="video-play-icon w-full h-full absolute text-[40px] flex justify-center items-center"
        >
          {loading ? (
            <Loading width="30px" height="30px" />
          ) : (
            <svg
              name="play"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
            </svg>
          )}
        </div>
      </div>

      <div className="video-info h-[60px] py-2.5 flex ">
        <img className="h-full rounded-full" src={item?.artist?.thumbnail} alt="" />

        <div className="video-name flex flex-col justify-between ml-2">
          <span>{truncateText(item?.title, 25)}</span>
          <span className="text-xs text-text-second">{truncateText(item?.artistsNames, 25)}</span>
        </div>
      </div>
    </div>
  )
}

export default VideoItem
