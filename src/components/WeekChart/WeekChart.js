import React from 'react'
import './weekChart.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'

const WeekChart = () => {
  const weekChart = useSelector((state) => state.home.weekChart)

  return (
    <div className="week-chart-section mt-10">
      <Row gutter={24} justify="center">
        {weekChart.items?.map((item) => (
          <Col key={item.cover} sm={8}>
            <div className="week-chart-item mb-5 overflow-hidden rounded-lg">
              <Link className="rounded-lg" to="">
                <img className="rounded-lg" src={item.cover} alt="" />
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default WeekChart
