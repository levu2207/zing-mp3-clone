import React from 'react'
import './weekChart.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const WeekChart = () => {
  const weekChart = useSelector((state) => state.home.weekChart)

  return (
    <div className="week-chart-section mt-7">
      <div className="grid grid-cols-12 gap-7">
        {weekChart.items?.map((item) => (
          <div
            key={item.cover}
            className="week-chart-item col-span-12 md:col-span-6 xl:col-span-4 rounded-lg overflow-hidden mb-7"
          >
            <Link className="rounded-lg overflow-hidden" to="">
              <img className="rounded-lg" src={item.cover} alt="" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeekChart
