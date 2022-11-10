import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadList from '../../components/Loading/LoadList'
import { addPlayList } from '../../redux/reducers/listSlice'
import mp3Service from '../../services/mp3Services'
import FavoriteSongItem from '../Profile/FavoriteSongItem'
import './chartHome.css'
import ChartPage from './ChartPage'
import { useDispatch } from 'react-redux'

const ChartHome = () => {
  const [loading, setLoading] = useState(true)
  const [dataChart, setDataChart] = useState([])
  const [index, setIndex] = useState(10)
  const [isCompleted, setIsCompleted] = useState(false)
  const initialList = dataChart?.RTChart?.items.slice(0, index)

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
    mp3Service.getListChartPage().then((res) => {
      if (res.err === 0) {
        setDataChart(res.data)
        setLoading(false)
        dispatch(addPlayList(res.data.RTChart.items))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="chart-page">
      <div className="chart-page-wrapper relative w-full pt-[50px] px-[50px]">
        <div className="bg-blur-chart-page"></div>
        <div className="bg-alpha z-0"></div>
        <div className="bg-alpha-1 z-0"></div>
        <div className="chart-page-header text-white text-[40px]">
          <Link to="/zingchart">#zingchart</Link>
          <button className="w-[40px] h-[40px]">
            <i className="fa-solid fa-play text-white text-lg"></i>
          </button>
        </div>

        <ChartPage />
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
export default ChartHome
