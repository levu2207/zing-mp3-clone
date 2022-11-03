import React from 'react'
import { Link } from 'react-router-dom'
import Chart from './Chart'
import './zingChart.css'
import { useSelector } from 'react-redux'
import SongItem from '../NewRelease/SongItem'

const ZingChart = () => {
  const zingChart = useSelector((state) => state.home.zingChart)
  const listSinger = zingChart.items.slice(0, 3)
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

      <div className="z-chart-content grid grid-cols-10">
        <div className="list-singer col-span-4 px-3">
          <div className="singer-item h-20 hover:bg-text-chart-bg flex items-center justify-between rounded px-4">
            <div className="singer-item-left h-full flex items-center">
              <span className="numbber-item is-top1 mr-2">1</span>
              <SongItem
                song={listSinger[0]}
                hover="hover:bg-transparent active:bg-text-chart-bg"
                notDate={true}
              />
            </div>

            <div className="singer-item-right">
              <span className="singers-score text-white text-[16px] font-bold">
                {calcPercents(totalScore, listSinger[0].score)}
              </span>
            </div>
          </div>
        </div>

        <div className="chart-js col-span-6 px-3">
          <Chart />
        </div>
      </div>
    </div>
  )
}

export default ZingChart
