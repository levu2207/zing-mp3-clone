import { Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { lyricsData } from '../../utils/lyricsData'

const LyricsTab = ({ song, className, lyrics }) => {
  const cdRef = useRef()

  useEffect(() => {
    const cdThumb = document.querySelector('.lyrics-tab-thumb img')
    if (cdThumb) {
      cdRef.current = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
        duration: 20000,
        iterations: Infinity,
        easing: 'linear',
      })
      cdRef.current.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlethumbRotate = () => {
    // thumb rotate
    cdRef.current.play()
  }

  const handlethumbStop = () => {
    // thumb stop
    cdRef.current.pause()
  }

  const handleShowLyrics = (e) => {
    // lyrics
    const lyricsText = document.querySelectorAll('.lyrics-text li')
    if (lyricsText) {
      const time = e.target.currentTime
      const index = lyricsData.syncLyric(lyrics, time)
      if (index === null) return

      lyricsText[index].style.color = '#ffed00'
      lyricsText[index].scrollIntoView({ behavior: 'smooth', block: 'center' })

      for (let i = 0; i < index; i++) {
        lyricsText[i].style.color = 'hsla(0,0%,100%,0.5)'
      }

      for (let i = index + 1; i < lyricsText.length; i++) {
        lyricsText[i].style.color = '#fff'
      }
    }
  }

  useEffect(() => {
    const audio = document.getElementById('audio')

    audio.addEventListener('timeupdate', handleShowLyrics)
    audio.addEventListener('play', handlethumbRotate)
    audio.addEventListener('pause', handlethumbStop)

    return () => {
      audio.removeEventListener('timeupdate', handleShowLyrics)
      audio.removeEventListener('play', handlethumbRotate)
      audio.removeEventListener('pause', handlethumbStop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lyrics])

  return (
    <div className={`lyrics-tab w-full h-full ${className}`}>
      <Row className="w-full h-full">
        <Col span={24} lg={10} xl={9} className="lyrics-tab-thumb flex justify-center items-center">
          <img src={song?.thumbnailM} alt="" className="w-[90%]  rounded-full" />
        </Col>
        <Col
          span={24}
          flex="center"
          lg={14}
          xl={15}
          className="lyrics-text flex justify-center items-center"
        >
          {lyrics.length === 0 ? (
            <p className="text-[40px] text-text-second font-bold">Bài hát chưa có lyrics</p>
          ) : (
            <ul className="max-h-[460px] overflow-y-auto">
              {lyrics?.map((item) => (
                <li key={item.time.toString()} className="py-5 text-[40px] font-bold blur]">
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </div>
  )
}

LyricsTab.propTypes = {
  song: PropTypes.object,
  className: PropTypes.string,
  lyrics: PropTypes.array,
}

export default LyricsTab
