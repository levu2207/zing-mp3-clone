import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadList from '../../components/Loading/LoadList'
import mp3Service from '../../services/mp3Services'

const ArtistsPage = () => {
  const { alias } = useParams()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mp3Service.getArtistInfo(alias).then((res) => {
      if (res.err === 0) {
        setData(res.data)
        console.log(res.data)
        setLoading(false)
      }
    })
  }, [alias])
  return (
    <div className=" text-white">
      {loading ? (
        <LoadList className="h-[80px] w-[80px]" />
      ) : (
        <div className="text-2xl">{data.name}</div>
      )}
    </div>
  )
}

export default ArtistsPage
