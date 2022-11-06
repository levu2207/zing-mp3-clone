import React from 'react'
import { useNavigate } from 'react-router-dom'
import emptyImage from '../../assets/img/empty-fav-song-dark.png'
import emptyVideo from '../../assets/img/empty-mv-dark.png'

const EmptySong = ({ song = true }) => {
  const navigate = useNavigate()

  return (
    <div className="empty-song flex flex-col justify-start items-center mt-16">
      <div className="empty-img">
        <img className="w-32 h-32" src={song ? emptyImage : emptyVideo} alt="" />
      </div>

      <div className="empty-song-content text-base text-text-second my-4">
        {`Chưa có ${song ? 'bài hát' : 'MV'} yêu thích trong thư viện cá nhân`}
      </div>

      <button
        onClick={() => navigate(`/${song ? 'moi-phat-hanh' : 'the-loai-video'}`)}
        className="bg-purple hover:bg-opacity-70 rounded-full uppercase py-2 px-6"
      >
        Khám phá ngay
      </button>
    </div>
  )
}

export default EmptySong
