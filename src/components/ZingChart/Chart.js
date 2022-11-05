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
import calcPercentScore from '../../utils/calcPercentScore'
import truncateText from '../../utils/truncateText'

const Chart = ({ chart, listSong, totalScore }) => {
  const times = chart.times

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
  const chartRef = useRef()

  const chartItem = chart.items
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

  const triggerTooltip = (chart = ChartJS || null, count) => {
    const tooltip = chart?.tooltip

    const timeNow = new Date().getHours()
    const index = times.findIndex((item) => item.hour === timeNow.toString())
    chart.setActiveElements([{ datasetIndex: 0, index: index }])
    console.log(chart)
    if (!tooltip) {
      return
    }
    console.log(tooltip.getActiveElements().length)
    if (tooltip.getActiveElements().length > 0) {
      tooltip.setActiveElements([], { x: 0, y: 0 })
    } else {
      const x = chart._active[0].element.x
      const y = chart._active[0].element.y
      console.log(x)

      tooltip.setActiveElements(
        [
          {
            datasetIndex: 1,
            index: index,
          },
        ],
        {
          x: x,
          y: y,
        }
      )

      const tooltipEl = document.querySelector('div.zm-chart-tooltip')
      tooltipEl.style.left = x + 'px'
      tooltipEl.style.top = y + 'px'
    }

    chart.update()
  }

  useEffect(() => {
    const chart = chartRef.current

    triggerTooltip(chart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // set data
  const labels = getLabels(chart.times)
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

  // trigger
  const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context
    console.log(tooltip, chart)

    songInfo = JSON.parse(tooltip.dataPoints[0].dataset.label)

    const songThumbnail = document.querySelector('img.song-thumb')
    if (songThumbnail) {
      songThumbnail.src = songInfo[2]
    }

    const songTitle = document.querySelector('p.song-title')
    if (songTitle) {
      songTitle.innerHTML = truncateText(songInfo[0], 8)
    }

    const songArtist = document.querySelector('span.song-artist')
    if (songArtist) {
      songArtist.innerHTML = truncateText(songInfo[1], 8)
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
    <>
      <Line options={options} data={data} ref={chartRef} />

      {/* tooltip element */}
      <div className="zm-chart-tooltip h-[50px] w-[150px] absolute z-50">
        <div className="song-data h-full flex justify-between items-center">
          <div className="song-left h-full">
            <img className="song-thumb h-full" src="" alt="" />
          </div>
          <div className="song-info mx-1">
            <p className="song-title text-[12px]"></p>
            <span className="song-artist text-[10px] text-[#EAEAEA]"></span>
          </div>

          <span className="song-score text-[12px]"></span>
        </div>

        <span className="tooltip-caret" />
      </div>
    </>
  )
}

export default Chart
