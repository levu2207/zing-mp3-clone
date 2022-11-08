import React from 'react'
import AudioControl from './AudioControl'
import './player.css'
import PlayerItem from './PlayerItem'
import PlayerSub from './PlayerSub'
import { Col, Row } from 'antd'
import { useSelector } from 'react-redux'
import ZmKaraoke from './ZmKaraoke'

const Player = () => {
  const song = useSelector((state) => state.play.playItem)
  const isShowKaraoke = useSelector((state) => state.play.showKaraoke)

  return (
    <>
      <div
        id="zm-player"
        className={`zm-player fixed z-50 bottom-0 h-[90px] px-5 w-full ${
          !isShowKaraoke && 'bg-player-bg border-t border-border-bg'
        } `}
      >
        <Row gutter={16}>
          <Col className={`${isShowKaraoke && 'opacity-0'}`} span={7}>
            <PlayerItem song={song} className="w-[60px] h-[60px] rounded" options={true} />
          </Col>
          <Col span={10}>
            <AudioControl />
          </Col>
          <Col className={`${isShowKaraoke && 'opacity-0'}`} span={7}>
            <PlayerSub />
          </Col>
        </Row>
      </div>

      {/* karaoke */}
      <ZmKaraoke song={song} />
    </>
  )
}

export default Player
