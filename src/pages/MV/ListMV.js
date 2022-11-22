import { Col, Row } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import mp3Service from '../../services/mp3Services'
import LoadList from './../../components/Loading/LoadList'
import VideoItem from './VideoItem'

const ListMV = ({ empty = false }) => {
  const scrollRef = useRef(null)
  const [showDrop, setShowDrop] = useState(false)
  const [type, setType] = useState('Tất cả')
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState('IWZ9Z08I')
  const [data, setData] = useState([])
  const [filter, setFilter] = useState({
    id: id,
    page: 1,
    count: 20,
    type: 'genre',
    sort: 'listen',
  })
  const videoList = data?.items

  const listTypeVideo = [
    {
      label: 'Tất cả',
      id: 'IWZ9Z08I',
    },
    {
      label: 'Rap Việt',
      id: 'IWZ9Z089',
    },
    {
      label: 'V-POP',
      id: 'IWZ97FCD',
    },
    {
      label: 'R&B Việt',
      id: 'IWZ9Z0C8',
    },
    {
      label: 'EDM Việt',
      id: 'IWZ97FCE',
    },
    {
      label: 'Nhạc Trữ Tình',
      id: 'IWZ9Z08B',
    },
  ]

  useEffect(() => {
    setLoading(true)
    mp3Service.getListVideo(filter).then((res) => {
      if (res.err === 0) {
        setData(res.data)
        setLoading(false)
      }
    })
  }, [filter])

  useEffect(() => {
    scrollRef.current = document.querySelector('.zm-container')
    scrollRef.current.addEventListener('scroll', handleLoadVideo)

    return () => {
      scrollRef.current.removeEventListener('scroll', handleLoadVideo)
    }
  }, [])

  const handleLoadVideo = (e) => {}

  const handleSelectTypeVideo = (data) => {
    setType(data.label)
    const newFilter = {
      ...filter,
      id: data.id,
    }
    setFilter(newFilter)
  }

  return (
    <div className="video-list">
      <div
        onClick={() => setShowDrop(!showDrop)}
        className="video-select-type relative h-10 w-[160px] mt-3 mb-8 bg-text-chart-bg flex justify-center items-center cursor-pointer rounded-full"
      >
        <span className="text-white">
          <i className="fa-solid fa-music mr-4"></i>
          {type}
          <i className="fa-solid fa-chevron-down ml-4"></i>
        </span>

        {showDrop && (
          <div className="drop-content w-[200%] flex flex-wrap absolute z-[5] left-0 top-[110%] bg-[#34224F] rounded-lg overflow-hidden">
            {listTypeVideo?.map((item) => (
              <div
                onClick={() => handleSelectTypeVideo(item)}
                key={item.label}
                name={item.id}
                className="p-3 hover:bg-text-chart-bg text-white w-1/2"
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
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
