import React from 'react'
import { useSelector } from 'react-redux'
import EmptySong from './EmptySong'
import { Row, Col } from 'antd'
import FavoriteSongItem from './FavoriteSongItem'

const MyRecents = () => {
  const recentMusic = useSelector((state) => state.play.recentMusic)

  return (
    <div>
      {recentMusic.length === 0 ? (
        <EmptySong />
      ) : (
        <div className="favorite-list mt-10">
          <Row className="favorite-list-header p-2.5 border-b border-border-bg justify-between">
            <Col
              span={16}
              md={12}
              className="favorite-list-name uppercase text-xs text-text-second"
            >
              Bài hát
            </Col>
            <Col span={0} md={8} className="favorite-list-album uppercase text-xs text-text-second">
              Album
            </Col>
            <Col
              span={8}
              md={4}
              className="favorite-list-time uppercase text-xs text-text-second flex justify-center"
            >
              Thời gian
            </Col>
          </Row>

          <div className="favorite-list-content">
            {recentMusic.map((item) => (
              <div key={item.encodeId}>
                <FavoriteSongItem song={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyRecents
