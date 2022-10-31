import { Progress } from 'antd'
import React from 'react'
import totalTime from '../../utils/totalTime'

const ProgressBar = ({ percent, totalTimeAudio, currentTimeAudio }) => {
  return (
    <div className="progress-bar flex text-white text-xs items-center">
      <span className="current-time mr-2 text-[#cccccc]">{totalTime(currentTimeAudio)}</span>
      <Progress percent={percent} showInfo={false} strokeColor="#ffffff" trailColor="#ffffff1a" />
      <span className="total-time ml-2">{totalTime(totalTimeAudio)}</span>
    </div>
  )
}

export default ProgressBar
