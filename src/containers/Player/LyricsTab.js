import { Col, Row } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLyrics } from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'

const LyricsTab = ({ song }) => {
  const lyrics = useSelector((state) => state.play.lyrics)
  const dispatch = useDispatch()

  const handleShowLyrics = (e) => {
    const lyricsText = document.querySelectorAll('.lyrics-text li')
    if (lyricsText) {
      const time = e.target.currentTime
      const index = syncLyric(lyrics, time)
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
    ;(async () => {
      const { data } = await mp3Service.getLyrics(song.encodeId)
      await axios.get(`${data.file}`).then((res) => {
        const lrc = parseLyric(res.data)
        dispatch(addLyrics(lrc))
      })
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song])

  useEffect(() => {
    const audio = document.getElementById('audio')
    audio.addEventListener('timeupdate', handleShowLyrics)

    return () => {
      audio.removeEventListener('timeupdate', handleShowLyrics)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function parseLyric(lrc) {
    // will match "[00:00.00] ooooh yeah!"
    // note: i use named capturing group
    const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/

    // split lrc string to individual lines
    const lines = lrc.split('\n')
    const output = []

    lines.forEach((line) => {
      const match = line.match(regex)

      // if doesn't match, return.
      if (match == null) return

      const { time, text } = match.groups

      output.push({
        time: parseTime(time),
        text: text.trim(),
      })
    })

    // parse formated time
    // "03:24.73" => 204.73 (total time in seconds)
    function parseTime(time) {
      const minsec = time.split(':')

      const min = parseInt(minsec[0]) * 60
      const sec = parseFloat(minsec[1])

      return min + sec
    }

    return output
  }

  // lyrics (Array) - output from parseLyric function
  // time (Number) - current time from audio player
  function syncLyric(lyrics, time) {
    const scores = []

    lyrics.forEach((lyric) => {
      // get the gap or distance or we call it score
      const score = time - lyric.time

      // only accept score with positive values
      if (score >= 0) scores.push(score)
    })

    if (scores.length === 0) return null

    // get the smallest value from scores
    const closest = Math.min(...scores)

    // return the index of closest lyric
    return scores.indexOf(closest)
  }

  return (
    <div className="lyrics-tab w-full h-full">
      <Row className="w-full h-full">
        <Col span={24} lg={10} className="lyrics-tab-thumb flex justify-center items-center">
          <img src={song.thumbnailM} alt="" className="w-[350px] h-[350px] rounded-full" />
        </Col>
        <Col
          span={24}
          flex="center"
          lg={14}
          className="lyrics-text flex justify-center items-center"
        >
          <ul className="max-h-[460px] overflow-y-auto">
            {lyrics.map((item) => (
              <li key={item.time.toString()} className="py-5 text-[40px] font-bold blur]">
                {item.text}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  )
}

export default LyricsTab
