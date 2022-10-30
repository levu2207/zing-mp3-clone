import { Col, Row } from 'antd'
import React from 'react'
import AlbumItem from './AlbumItem'

const Album = ({ albums }) => {
  return (
    <div className="text-white">
      <Row gutter={16}>
        {albums.map((album) => (
          <Col key={album.encodeId} xs={24} md={12} xl={8}>
            <AlbumItem album={album} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Album
