import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({ chart, listSong }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
  console.log(listSong)

  const chartItem = chart.items
  const top1 = chartItem[Object.keys(chartItem)[0]]
  const top2 = chartItem[Object.keys(chartItem)[1]]
  const top3 = chartItem[Object.keys(chartItem)[2]]

  const top1Info = [`${listSong[0].title}`, `${listSong[0].artistsNames}`]
  const top2Info = [`${listSong[1].title}`, `${listSong[1].artistsNames}`]
  const top3Info = [`${listSong[2].title}`, `${listSong[2].artistsNames}`]

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
        label: `${Object.keys(chartItem)[1]}`,
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
        label: `${Object.keys(chartItem)[2]}`,
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
    console.log(tooltip)
    const tooltipEl = document.querySelector('div.zm-chart-tooltip')
    tooltipEl.style.background = `${tooltip.labelColors[0].backgroundColor}`
    tooltipEl.style.borderRadius = '3px'
    tooltipEl.style.color = 'white'
    tooltipEl.style.opacity = 1
    tooltipEl.style.pointerEvents = 'none'
    tooltipEl.style.position = 'absolute'
    tooltipEl.style.transform = 'translate(-50%, 0)'
    tooltipEl.style.transition = 'all .1s ease'

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas

    tooltipEl.style.display = 'block'
    // tooltipEl.style.left = `${tooltip.caretX}px`
    // tooltipEl.style.top = `${tooltip.caretY}px`

    tooltipEl.style.left = positionX + tooltip.caretX + 'px'
    tooltipEl.style.top = positionY + tooltip.caretY + 'px'
    tooltipEl.style.font = tooltip.options.bodyFont.string
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'

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

  return <Line options={options} data={data} />
}

export default Chart
