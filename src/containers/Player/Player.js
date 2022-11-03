import React from 'react'
import AudioControl from './AudioControl'
import './player.css'
import PlayerItem from './PlayerItem'
import PlayerSub from './PlayerSub'
import { Col, Row } from 'antd'
import { useSelector } from 'react-redux'

const Player = () => {
  console.log('render player')
  const song = useSelector((state) => state.play.playItem)

  return (
    <div className="player-wrapper fixed z-50 bottom-0 h-[90px] px-5 w-full bg-player-bg border-t border-border">
      <Row gutter={16}>
        <Col className="gutter-row" span={7}>
          <PlayerItem song={song} width={16} height={16} />
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
