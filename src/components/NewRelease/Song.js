import { Col, Row } from 'antd'
import React from 'react'
import SongItem from './SongItem'

const Song = ({ songs, onClick }) => {
  return (
    <div onClick={() => onClick()} className="text-white">
      <Row gutter={16}>
        {songs.map((song) => (
          <Col key={song.encodeId} xs={24} sm={12} lg={8} style={{ height: '80px' }}>
            <SongItem song={song} library={false} option={true} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Song
