import { Select, Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import mp3Service from '../../services/mp3Services'
import VideoItem from './VideoItem'
import LoadList from './../../components/Loading/LoadList'
const { Option } = Select

const ListMV = ({ empty = false }) => {
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState('IWZ9Z08I')
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({
    id: id,
    page: 1,
    count: 9,
    type: 'genre',
    sort: 'listen',
  })
  const videoList = data?.items

  useEffect(() => {
    mp3Service.getListVideo(filter).then((res) => {
      if (res.err === 0) {
        setData(res.data)
        setLoading(false)
      }
    })
  }, [filter])

  return (
    <div className="video-list">
      {/* <div className="video-select">
        <Select value={id} onChange={(e) => handleSelectTypeVideo(e)}>
          <Option value="IWZ9Z08I">Tất Cả</Option>
          <Option value="IWZ9Z089">Rap Việt</Option>
          <Option value="IWZ9Z08B">Nhạc Trữ TÌnh</Option>
          <Option value="IWZ97FCE">Rock Việt</Option>
        </Select>
      </div> */}
      {loading ? (
        <LoadList className="w-[80px] h-[80px]" />
      ) : (
        <Row gutter={30}>
          {videoList?.map((item) => (
            <Col key={item.encodeId} span={24} md={12} lg={8}>
              <VideoItem item={item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default ListMV
