import React, { useEffect } from 'react'
import totalTime from '../../utils/totalTime'

const ProgressBar = ({ percent, totalTimeAudio, currentTimeAudio }) => {
  const handleProgress = (e) => {
    const audio = document.getElementById('audio')
    const progressSlider = document.querySelector('.progress-slider')
    const width = e.offsetX
    const maxWidth = e.currentTarget
    const progressSliderWidth = (width / maxWidth.clientWidth) * 100
    progressSlider.style.width = `${progressSliderWidth}%`
    audio.currentTime = (width / maxWidth.clientWidth) * totalTimeAudio
  }
  useEffect(() => {
    const progress = document.querySelector('.progress-slider')
    progress.style.width = `${percent}%`

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  useEffect(() => {
    const progressBar = document.getElementById('progress')
    progressBar.addEventListener('click', handleProgress)

    return () => {
      progressBar.removeEventListener('click', handleProgress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="music-duration flex text-white text-xs items-center">
      <span className="current-time mr-2 text-[#cccccc]">{totalTime(currentTimeAudio)}</span>

      <div id="progress" className="progress-bar">
        <div className="progress-slider">
          <div className="progress-dot"></div>
        </div>
      </div>

      <span className="total-time ml-2">{totalTime(totalTimeAudio)}</span>
    </div>
  )
}

export default ProgressBar
