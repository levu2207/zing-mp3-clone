import React from 'react'
import AudioControl from './AudioControl'
import './player.css'
import PlayerItem from './PlayerItem'
import PlayerSub from './PlayerSub'
import { Col, Row } from 'antd'
import { useSelector } from 'react-redux'
import ZmKaraoke from './ZmKaraoke'
import Skeleton from 'react-loading-skeleton'

const Player = () => {
  const playItem = useSelector((state) => state.list.playItem)
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
          <Col className={`${isShowKaraoke && 'opacity-0'}`} span={0} lg={7}>
            {playItem === undefined || JSON.stringify(playItem) === '{}' ? (
              <Skeleton height="68px" className="!bg-[#1a1129]" />
            ) : (
              <PlayerItem
                song={playItem}
                className="w-[60px] h-[60px] rounded"
                options={true}
                numberText={24}
              />
            )}
          </Col>
          <Col span={isShowKaraoke ? 24 : 14} lg={10}>
            <AudioControl currentSong={playItem} />
          </Col>
          <Col className={`${isShowKaraoke && 'opacity-0'}`} span={isShowKaraoke ? 0 : 10} lg={7}>
            <PlayerSub />
          </Col>
        </Row>
      </div>

      {/* karaoke */}
      <ZmKaraoke song={playItem} />
    </>
  )
}

export default Player
