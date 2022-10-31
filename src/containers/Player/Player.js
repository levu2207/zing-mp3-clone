import React from 'react'
import AudioControl from './AudioControl'
import './player.css'
import PlayerItem from './PlayerItem'
import PlayerSub from './PlayerSub'
import { Col, Row } from 'antd'

const Player = () => {
  return (
    <div className="player-wrapper fixed z-50 bottom-0 h-[90px] px-5 w-full bg-player-bg border-t border-border">
      <div className="player-container h-full w-full">
        <Row gutter={16}>
          <Col className="gutter-row" span={7}>
            <PlayerItem />
          </Col>
          <Col className="gutter-row" span={10}>
            <AudioControl />
          </Col>
          <Col className="gutter-row" span={7}>
            <PlayerSub />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Player
