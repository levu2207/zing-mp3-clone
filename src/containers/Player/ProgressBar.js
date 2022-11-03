import React, { useEffect, useState } from 'react'
import totalTime from '../../utils/totalTime'

const ProgressBar = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handleProgress = (e) => {
    const audio = document.getElementById('audio')
    const progressSlider = document.querySelector('.progress-slider')
    const width = e.offsetX
    const maxWidth = e.currentTarget.clientWidth
    const progressSliderWidth = (width / maxWidth) * 100
    progressSlider.style.width = `${progressSliderWidth}%`
    audio.currentTime = (width / maxWidth) * audio.duration
    setCurrentTime(audio.currentTime)
  }

  const handleTimeUpdate = () => {
    const audio = document.getElementById('audio')
    const percent = (audio.currentTime / audio.duration) * 100
    setDuration(audio.duration)
    setCurrentTime(audio.currentTime)

    const progressSlider = document.querySelector('.progress-slider')
    progressSlider.style.width = `${percent}%`
  }

  useEffect(() => {
    const progressBar = document.getElementById('progress')
    const audio = document.getElementById('audio')
    progressBar.addEventListener('click', handleProgress)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      progressBar.removeEventListener('click', handleProgress)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="music-duration flex text-white text-xs items-center">
      <span className="current-time mr-2 text-[#cccccc]">{totalTime(currentTime)}</span>

      <div id="progress" className="progress-bar">
        <div className="progress-slider">
          <div className="progress-dot"></div>
        </div>
      </div>

      <span className="total-time ml-2">{totalTime(duration)}</span>
    </div>
  )
}

export default ProgressBar
