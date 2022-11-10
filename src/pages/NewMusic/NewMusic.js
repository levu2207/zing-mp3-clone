import React, { useEffect, useState } from 'react'
import mp3Service from '../../services/mp3Services'
import FavoriteSongItem from '../Profile/FavoriteSongItem'
import './newMusic.css'
import { Link } from 'react-router-dom'
import LoadList from '../../components/Loading/LoadList'
import { useDispatch } from 'react-redux'
import { addPlayList } from '../../redux/reducers/playSlice'

const NewMusic = () => {
  const [loading, setLoading] = useState(true)
  const [dataChart, setDataChart] = useState([])
  const [index, setIndex] = useState(10)
  const [isCompleted, setIsCompleted] = useState(false)
  const initialList = dataChart?.items?.slice(0, index)

  const dispatch = useDispatch()

  const loadMore = () => {
    setIndex(index + 10)
    if (index >= dataChart.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }

  useEffect(() => {
    mp3Service.getNewSongList().then((res) => {
      if (res.err === 0) {
        setDataChart(res.data)
        setLoading(false)
        dispatch(addPlayList(res.data.items))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="chart-page">
      <div className="chart-page-wrapper relative w-full pt-[50px] px-[50px]">
        <div className="bg-blur-new-song"></div>
        <div className="bg-alpha  h-[380px]"></div>
        <div className="bg-alpha-1  h-[380px]"></div>
        <div className="chart-page-header text-white text-[40px]">
          <Link to="/">Nhạc Mới</Link>
          <button className="w-[40px] h-[40px]">
            <i className="fa-solid fa-play text-white text-lg"></i>
          </button>
        </div>
      </div>

      {loading ? (
        <LoadList className="w-[80px] h-[80px]" />
      ) : (
        <div className="list-wrapper relative px-[50px] flex flex-col items-center">
          <div className="list-song-chart w-full">
            {initialList?.map((item, idx) => (
              <div key={item.encodeId}>
                <FavoriteSongItem song={item} number={idx + 1} />
              </div>
            ))}
          </div>
          <div className="d-grid mt-3 mb-5">
            {!isCompleted && (
              <button onClick={loadMore} className="more-btn">
                Xem thêm
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewMusic
