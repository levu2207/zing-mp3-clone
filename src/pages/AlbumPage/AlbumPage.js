import React, { useEffect, useState } from 'react'
import './albumPage.css'
import { useParams, useNavigate } from 'react-router-dom'
import mp3Service from '../../services/mp3Services'
import LoadList from './../../components/Loading/LoadList'
import FavoriteSongItem from '../Profile/FavoriteSongItem'

const AlbumPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    mp3Service.getAlbum(id).then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }, [id])

  const handleNavigateToArtist = (data) => {
    if (data.artists[0].link.slice(1, 8) === 'nghe-si') {
      navigate(data.artists[0].link)
    } else {
      navigate(`/nghe-si${data.artists[0].link}`)
    }
  }

  return (
    <div className="album-page">
      {loading ? (
        <LoadList className="w-[80px] h-[80px]" />
      ) : (
        <div className="album-content text-white mt-14 container-all flex">
          <div className="album-CD w-[300px] flex flex-col items-center text-center">
            <img className="w-full rounded-xl" src={data?.thumbnailM} alt="" />

            <p className="text-xl mt-4 font-bold">{data?.title}</p>

            <span className="my-3 text-text-second text-xs">
              <span
                onClick={() => handleNavigateToArtist(data)}
                className="hover:underline hover:cursor-pointer"
              >
                {data?.artistsNames}
              </span>

              <span>{` • ${data?.releaseDate}`}</span>
            </span>
          </div>

          <div className="album-songs">
            {/* header */}
            <div className="album-songs-header flex justify-between items-center text-xs text-text-second uppercase font-medium">
              <span>bài hát</span>
              <span>thời gian</span>
            </div>

            {/* content */}
            {/* album songs */}
            {data?.song.items.map((item) => (
              <div key={item.encodeId}>
                <FavoriteSongItem song={item} />
              </div>
            ))}

            {/* relate songs  */}
            {data?.sections && (
              <div className="album-sections mt-10">
                <div className="album-section-item">
                  <h3 className="text-xl text-white font-bold capitalize">
                    {data?.sections[0]?.title}
                  </h3>

                  {data?.sections[0]?.items.map((item) => (
                    <div key={item.encodeId} className="">
                      <FavoriteSongItem song={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AlbumPage
