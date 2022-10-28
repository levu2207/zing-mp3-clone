import { Col, Row } from 'antd'
import React from 'react'
import releaseDate from '../../utils/releaseDate'
import truncateText from '../../utils/truncateText'

const Song = ({ songs }) => {
  console.log(songs)
  return (
    <div className="text-white">
      <Row gutter={16}>
        {songs.map((song) => (
          <Col key={song.encodeId} xs={24} md={12} xl={8}>
            <div className="song-item p-2.5 flex">
              <div className="song-img w-[60px] h-[60px] mr-2.5">
                <img className="w-full h-full rounded" src={song.thumbnail} alt="song" />
              </div>

              <div className="song-info">
                <p className="mb-1">{truncateText(song.title, 24)}</p>
                <p className="mb-1 text-xs text-[#FFFFFF80]">
                  {truncateText(song.artistsNames, 24)}
                </p>
                <p className="text-xs text-[#FFFFFF80]">{releaseDate(song.releaseDate)}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Song
