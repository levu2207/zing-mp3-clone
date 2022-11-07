import React from 'react'
import AudioControl from './AudioControl'
import './player.css'
import PlayerItem from './PlayerItem'
import PlayerSub from './PlayerSub'
import { Col, Row } from 'antd'
import { useSelector } from 'react-redux'

const Player = () => {
  const song = useSelector((state) => state.play.playItem)

  return (
    <div
      id="zm-player"
      className="zm-player fixed z-50 bottom-0 h-[90px] px-5 w-full bg-player-bg border-t border-border"
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={7}>
          <PlayerItem song={song} className="w-[60px] h-[60px] rounded" options={true} />
        </Col>
        <Col className="gutter-row" span={10}>
          <AudioControl />
        </Col>
        <Col className="gutter-row" span={7}>
          <PlayerSub />
        </Col>
      </Row>
    </div>
  )
}

export default Player
