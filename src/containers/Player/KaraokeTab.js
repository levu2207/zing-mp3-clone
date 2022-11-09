import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { lyricsData } from '../../utils/lyricsData'

const KaraokeTab = ({ song, className }) => {
  const karaoke = useSelector((state) => state.play.karaoke)
  const audioRef = useRef()
  const [lineEven, setLineEven] = useState([])
  const [lineOdd, setLineOdd] = useState([])
  const startTime = karaoke[0].words[0].startTime / 1000
  const [showTitle, setShowTitle] = useState(0)

  useEffect(() => {
    let evenLineKaraoke = []
    let oddLineKaraoke = []
    karaoke.forEach((line, idx) => {
      if (idx % 2 === 0) {
        evenLineKaraoke.push(line)
      } else {
        oddLineKaraoke.push(line)
      }
    })
    setLineEven(evenLineKaraoke)
    setLineOdd(oddLineKaraoke)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song])

  const handleKaraoke = (e) => {
    const time = audioRef.current.currentTime

    const index = lyricsData.syncKaraoke(karaoke, time)
    if (index === null) return

    if (index % 2 === 0) {
      const idx = index / 2
      const showKaraokeLineTop = document.querySelectorAll('.even-line li')
      if (showKaraokeLineTop) {
        showKaraokeLineTop[idx].style.opacity = 1
        showKaraokeLineTop[idx].style.color = '#FFFFFF'
        showKaraokeLineTop[idx].style.transition = 'all 1s'
      }
      for (let i = 0; i < idx; i++) {
        showKaraokeLineTop[i].style.opacity = 0
      }

      for (let i = idx + 1; i < showKaraokeLineTop.length; i++) {
        showKaraokeLineTop[i].style.opacity = 0
      }
    } else {
      let idx = Math.floor(index / 2)
      if (idx < 0) idx = 0
      const showKaraokeLineBottom = document.querySelectorAll('.odd-line li')
      if (showKaraokeLineBottom) {
        showKaraokeLineBottom[idx].style.opacity = 1
        showKaraokeLineBottom[idx].style.color = '#FFFFFF'
        showKaraokeLineBottom[idx].style.transition = 'all 1s'
      }
      for (let i = 0; i < idx; i++) {
        showKaraokeLineBottom[i].style.opacity = 0
        showKaraokeLineBottom[i].style.transition = 'all 1s'
      }

      for (let i = idx + 1; i < showKaraokeLineBottom.length; i++) {
        showKaraokeLineBottom[i].style.opacity = 0
        showKaraokeLineBottom[i].style.transition = 'all 1s'
      }
    }
  }

  useEffect(() => {
    audioRef.current = document.getElementById('audio')
    audioRef.current.addEventListener('timeupdate', handleKaraoke)

    return () => {
      audioRef.current.removeEventListener('timeupdate', handleKaraoke)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${className} karaoke-tab flex justify-center items-center w-full h-full`}>
      {showTitle >= 3 && (
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 text-white text-2xl">
          {song.title}
        </h1>
      )}
      <div className="karaoke-text h-[350px] w-full">
        <ul className="even-line h-1/2 w-full relative text-[#FFFFFFE6]">
          {lineEven.map((line, idx) => (
            <li
              key={Math.random(16).toString()}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 opacity-0"
            >
              {line.words.map((word) => (
                <span className="px-1.5" key={Math.random(16).toString()}>
                  {word.data}
                </span>
              ))}
            </li>
          ))}
        </ul>

        <ul className="odd-line h-1/2 w-full relative">
          {lineOdd.map((line, idx) => (
            <li
              key={Math.random(16).toString()}
              className="absolute bottom-1/2 left-1/2 -translate-x-1/2 opacity-0"
            >
              {line.words.map((word) => (
                <span className="px-1.5" key={Math.random(16).toString()}>
                  {word.data}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default KaraokeTab
