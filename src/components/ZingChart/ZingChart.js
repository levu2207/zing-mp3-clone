import React from 'react'
import { Link } from 'react-router-dom'
import Chart from './Chart'
import './zingChart.css'
import { useSelector } from 'react-redux'
import SongItem from '../NewRelease/SongItem'

const ZingChart = () => {
  const zingChart = useSelector((state) => state.home.zingChart)
  const chart = zingChart.chart
  const listSong = zingChart.items.slice(0, 3)
  const totalScore = zingChart.chart.totalScore

  const calcPercents = (total, score) => {
    if (!total || !score) return
    return `${Math.round((score / total) * 100)}%`
  }

  return (
    <div className="z-chart-home">
      <div className="bg-blur"></div>
      <div className="bg-gra"></div>

      <div className="z-chart-header text-white">
        <Link to="/zingchart">#zingchart</Link>
        <button>
          <i className="fa-solid fa-play text-purple text-lg"></i>
        </button>
      </div>

      <div className="z-chart-content grid grid-cols-10 xl:grid-cols-10">
        <div className="chart-content-left col-span-10 gap-x-3 xl:col-span-4 px-3 relative order-last xl:order-first">
          <div className="list-singer w-full">
            {listSong.map((item, idx) => (
              <div
                key={item.encodeId}
                className="singer-item h-20 bg-text-chart-bg flex items-center justify-between rounded px-4 mb-2"
              >
                <div className="singer-item-left h-full flex items-center">
                  <span className={`numbber-item is-top${idx + 1} mr-2`}>{idx + 1}</span>
                  <SongItem song={listSong[idx]} hover="hover:bg-transparent" notDate={true} />
                </div>

                <div className="singer-item-right">
                  <span className="singers-score text-white text-[16px] font-bold">
                    {calcPercents(totalScore, listSong[idx].score)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="more-btn">Xem thêm</button>
        </div>

        <div className="chart-content-right w-full mb-3 col-span-10 xl:col-span-6 px-3 relative pr-4">
          <Chart chart={chart} listSong={listSong} />

          {/* tooltip element */}
          <div className="zm-chart-tooltip h-[50px] absolute z-50">
            <div className="song-data h-full flex justify-between items-center">
              <div className="song-left h-full">
                <img
                  className="song-thumb h-full"
                  src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/a/6/5/5/a65573e6905dc4f29f59c49ea04866cf.jpg"
                  alt=""
                />
              </div>
              <div className="song-info">
                <p className="song-title"></p>
                <span className="song-artists"></span>
              </div>

              <span className="song-right"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZingChart
