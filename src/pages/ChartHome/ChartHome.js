import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mp3Service from '../../services/mp3Services'
import FavoriteSongItem from '../Profile/FavoriteSongItem'
import './chartHome.css'
import ChartPage from './ChartPage'

const ChartHome = () => {
  const [dataChart, setDataChart] = useState([])
  useEffect(() => {
    mp3Service.getListChartPage().then((res) => {
      if (res.err === 0) {
        setDataChart(res.data)
        console.log(res.data)
      }
    })
  }, [])
  return (
    <>
      <div className="chart-page">
        <div className="chart-page-wrapper relative w-full pt-[110px] px-[50px]">
          <div className="bg-blur-chart-page"></div>
          <div className="bg-alpha z-0"></div>
          <div className="chart-page-header text-white text-[40px]">
            <Link to="/zingchart">#zingchart</Link>
            <button className="w-[40px] h-[40px]">
              <i className="fa-solid fa-play text-white text-lg"></i>
            </button>
          </div>

          <ChartPage />
        </div>

        <div className="list-song-chart">
          {dataChart?.RTChart?.items.map((item, idx) => (
            <div key={item.encodeId}>
              <FavoriteSongItem song={item} number={idx + 1} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default ChartHome
