import { Col, Row } from 'antd'
import React from 'react'
import SongItem from './SongItem'

const Song = ({ songs }) => {
  return (
    <div className="text-white">
      <Row gutter={16}>
        {songs.map((song) => (
          <Col key={song.encodeId} xs={24} md={12} xl={8} style={{ height: '80px' }}>
            <SongItem song={song} library={false} option={true} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Song
