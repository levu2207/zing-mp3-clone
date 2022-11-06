import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import calcPercentScore from '../../utils/calcPercentScore'
import truncateText from '../../utils/truncateText'
import SongItem from '../NewRelease/SongItem'
import './zingChart.css'

const ZingChart = () => {
  const zingChart = useSelector((state) => state.home.zingChart)
  const chartInfo = zingChart.chart
  const times = chartInfo.times
  const listSong = zingChart.items.slice(0, 3)
  const totalScore = zingChart.chart.totalScore

  const chartRef = useRef()

  const showTooltip = (dataIndex) => {
    const chart = chartRef.current
    const tooltip = chart?.tooltip
    const index = Math.floor(Math.random() * 24)
    tooltip.setActiveElements([{ datasetIndex: dataIndex, index: index }])
    chart.setActiveElements([{ datasetIndex: dataIndex, index: index }])
    chart.update()
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  )

  const chartItem = chartInfo.items
  const top1 = chartItem[Object.keys(chartItem)[0]]
  const top2 = chartItem[Object.keys(chartItem)[1]]
  const top3 = chartItem[Object.keys(chartItem)[2]]
  let songInfo = []

  const top1Info = [
    `${listSong[0].title}`,
    `${listSong[0].artistsNames}`,
    `${listSong[0].thumbnail}`,
  ]
  const top2Info = [
    `${listSong[1].title}`,
    `${listSong[1].artistsNames}`,
    `${listSong[1].thumbnail}`,
  ]
  const top3Info = [
    `${listSong[2].title}`,
    `${listSong[2].artistsNames}`,
    `${listSong[2].thumbnail}`,
  ]

  const getLabels = (data) => {
    let labels = []
    let newTime = []
    data.forEach((item) => {
      newTime.push(`${item.hour}:00`)
    })

    newTime.map((item, idx) => {
      if (idx % 2 === 0) {
        labels.push(item)
      } else {
        labels.push('')
      }
      return labels
    })
    return labels
  }

  useEffect(() => {
    const tooltipCaret = document.querySelector('span.tooltip-caret')
    if (tooltipCaret) {
      tooltipCaret.style.display = 'block'
    }
    const chart = chartRef.current
    let count = 0
    const autoActiveChart = setInterval(() => {
      if (count > 2) count = 0
      document.querySelector('div.song-item.active-chart')?.classList.remove('active-chart')
      const songIsHover = document.querySelector(
        `.song-item > div > span.number-item.is-top${count + 1}`
      )
      songIsHover?.parentElement.parentElement.classList.add('active-chart')
      const tooltip = chart?.tooltip
      const index = Math.floor(Math.random() * 24)
      tooltip.setActiveElements([{ datasetIndex: count, index: index }])
      chart.setActiveElements([{ datasetIndex: count, index: index }])
      chart.update()
      count++
    }, 4000)

    return () => {
      clearInterval(autoActiveChart)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // set data
  const labels = getLabels(times)
  const data = {
    labels,
    datasets: [
      {
        label: `${JSON.stringify(top1Info)}`,
        data: top1.map((item) => {
          return item.counter
        }),
        borderColor: '#4a90e2',
        backgroundColor: '#4a90e2',
        borderWidth: 1.5,
        tension: 0.5,
        pointRadius: 0,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: '#4a90e2',
        pointHoverBorderColor: '#ffffff',
      },
      {
        label: `${JSON.stringify(top2Info)}`,
        data: top2.map((item) => {
          return item.counter
        }),
        borderColor: '#50e3c2',
        backgroundColor: '#50e3c2',
        borderWidth: 1.5,
        tension: 0.5,
        pointRadius: 0,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: '#50e3c2',
        pointHoverBorderColor: '#ffffff',
      },
      {
        label: `${JSON.stringify(top3Info)}`,
        data: top3.map((item) => {
          return item.counter
        }),
        borderColor: '#e35050',
        backgroundColor: '#e35050',
        borderWidth: 1.5,
        tension: 0.5,
        pointRadius: 0,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: '#e35050',
        pointHoverBorderColor: '#ffffff',
      },
    ],
  }

  // custom tooltip

  // trigger tooltip
  const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context

    songInfo = JSON.parse(tooltip.dataPoints[0].dataset.label)

    const songThumbnail = document.querySelector('img.song-thumb')
    if (songThumbnail) {
      songThumbnail.src = songInfo[2]
    }

    const songTitle = document.querySelector('p.song-title')
    if (songTitle) {
      songTitle.innerHTML = truncateText(songInfo[0], 12)
    }

    const songArtist = document.querySelector('span.song-artist')
    if (songArtist) {
      songArtist.innerHTML = truncateText(songInfo[1], 12)
    }

    const songScore = document.querySelector('span.song-score')
    if (songScore) {
      songScore.innerHTML = calcPercentScore(totalScore, tooltip.dataPoints[0].raw)
    }

    const tooltipCaret = document.querySelector('span.tooltip-caret')
    if (tooltipCaret) {
      tooltipCaret.style.borderTopColor = tooltip.labelColors[0].backgroundColor
    }

    const tooltipEl = document.querySelector('div.zm-chart-tooltip')
    tooltipEl.style.background = `${tooltip.labelColors[0].backgroundColor}`
    tooltipEl.style.borderRadius = '3px'
    tooltipEl.style.color = 'white'
    tooltipEl.style.opacity = 1
    tooltipEl.style.pointerEvents = 'none'
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.transform = 'translate(-50%,calc(-100% - 15px))'
    tooltipEl.style.transition = 'all .1s ease'

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
    tooltipEl.style.left = positionX + tooltip.caretX + 'px'
    tooltipEl.style.top = positionY + tooltip.caretY + 'px'
    tooltipEl.style.font = tooltip.options.bodyFont.string
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
    tooltipEl.style.display = 'block'

    return
  }

  // config
  const options = {
    responsive: true,
    hoverRadius: 6,
    hoverBackgroundColor: 'white',
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawTicks: false,
        },
      },
      y: {
        grid: {
          drawBorder: false,
          lineWidth: 0.5,
          drawTicks: false,
          color: '#FFFFFF1D',
        },
        ticks: {
          display: false,
        },
      },
    },
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
          <div className="list-singe w-full">
            {listSong.map((item, idx) => (
              <div
                onMouseOver={() => showTooltip(idx)}
                key={item.encodeId}
                className="chart-singer-item h-20 w-full bg-text-chart-bg flex items-center justify-between rounded-lg mb-2"
              >
                <div className="singer-item-left h-full w-full flex items-center">
                  <SongItem
                    song={listSong[idx]}
                    hover="hover:bg-transparent"
                    number={idx + 1}
                    notDate={true}
                    chart={true}
                    score={calcPercentScore(totalScore, listSong[idx].score)}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="more-btn">Xem thêm</button>
        </div>

        <div
          id="zm-chart"
          className="chart-content-right w-full mb-3 col-span-10 xl:col-span-6 px-3 relative"
        >
          <Line options={options} data={data} ref={chartRef} />

          {/* tooltip element */}
          <div className="zm-chart-tooltip h-[50px] w-[175px] absolute z-10">
            <div className="song-data h-full flex justify-between items-center">
              <div className="flex h-full items-center">
                <div className="song-left h-full">
                  <img className="song-thumb h-full" src="" alt="" />
                </div>
                <div className="song-info mx-1">
                  <p className="song-title text-[12px]"></p>
                  <span className="song-artist text-[10px] text-[#EAEAEA]"></span>
                </div>
              </div>

              <span className="song-score text-[12px]"></span>
            </div>

            <span className="tooltip-caret border-transparent hidden" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZingChart
