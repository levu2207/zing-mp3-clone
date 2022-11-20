import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddPlaylistBtn from '../../components/AddPlaylistBtn/AddPlaylistBtn'
import LoadList from '../../components/Loading/LoadList'
import mp3Service from '../../services/mp3Services'
import { convertDate } from '../../utils/convertDate'
import FavoriteSongItem from '../Profile/FavoriteSongItem'
import AlbumItem from './../../components/NewRelease/AlbumItem'
import ZmSection from './../../components/ZmSection/ZmSection'
import ArtistList from './ArtistList'
import './artistPage.css'

const ArtistsPage = () => {
  const { alias } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    mp3Service.getArtistInfo(alias).then((res) => {
      if (res.err === 0) {
        const data = res.data
        setData(data)
        setLoading(false)
      }
    })
  }, [alias])

  useEffect(() => {
    const autoBanner = setInterval(() => {
      const list = document.querySelectorAll('.artist-slider-item')
      const parent = document.querySelector('.artist-slider')
      if (list) {
        if (parent) {
          parent.appendChild(list[0])
        }
      }
    }, 2000)

    return () => {
      clearInterval(autoBanner)
    }
  }, [])

  return (
    <>
      {loading ? (
        <LoadList className="h-[80px] w-[80px]" />
      ) : (
        <div className="text-white">
          <div className="artist-hero h-[410px] relative overflow-hidden">
            <div
              className="bg-artist"
              style={{
                background: `url(${data.thumbnailM})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50%',
                backgroundSize: 'cover',
              }}
            ></div>
            <div className="bg-alpha-2"></div>

            <div className="container-all relative z-[2] flex items-center justify-between">
              <div className="hero-info h-full pt-16 w-[60%]">
                <p className="hero-artist-name text-white font-bold">{data.name}</p>
                <p
                  className="artist-desc mt-5 text-sm h-[100px] overflow-x-hidden overflow-y-scroll"
                  dangerouslySetInnerHTML={{
                    __html: data.biography !== '' ? data.biography : data.sortBiography,
                  }}
                ></p>
                <div className="hero-btn mt-5">
                  <AddPlaylistBtn data={data} />

                  <button className="btn uppercase py-2.5 px-5 bg-purple rounded-full">{`quan tâm • ${convertDate.convertFollow(
                    data.follow
                  )}`}</button>
                </div>

                <div className="artist-top-album mt-4">
                  <AlbumItem album={data.topAlbum} realDate={true} />
                </div>
              </div>

              <div className="artist-thumb w-[40%] flex justify-end items-center">
                <img
                  className="max-w-[260px] rounded-full"
                  src={data.thumbnailM}
                  alt="artistThumb"
                />
              </div>
            </div>
          </div>

          <div className="artist-content container-all h-auto mb-10">
            {/* list song */}
            <div className="artist-songs">
              <p className="artist-title text-xl mt-8 mb-5 uppercase font-bold">
                {data?.sections[0].title}
              </p>
              <div className="list-song-wrapper flex">
                <div className="artist-slider w-[300px] h-[240px] relative">
                  {data?.sections[0]?.items.map((item) => (
                    <img
                      key={Math.random(16).toString()}
                      src={item.thumbnailM}
                      className="artist-slider-item absolute rounded-md right-0"
                      alt=""
                    ></img>
                  ))}
                </div>

                <div className="artist-list-song pl-5 h-[250px] overflow-x-hidden overflow-y-scroll">
                  {data?.sections[0]?.items.map((item) => (
                    <div key={item.encodeId}>
                      <FavoriteSongItem song={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* list album */}
            {data?.sections[1] && (
              <div className="artist-section">
                <ZmSection
                  section={data?.sections[1]}
                  album={data?.sections[1].sectionType === 'playlist'}
                />
              </div>
            )}

            {/* list album */}
            {data?.sections[2] && (
              <div className="artist-section">
                <ZmSection
                  section={data?.sections[2]}
                  album={data?.sections[2].sectionType === 'playlist'}
                />
              </div>
            )}

            {/* list MV */}
            {data?.sections[3] && (
              <div className="artist-section">
                <ZmSection
                  section={data?.sections[3]}
                  album={data?.sections[3].sectionType === 'playlist'}
                />
              </div>
            )}

            {/* playlist */}
            {data?.sections[4] ? (
              data?.sections[4].sectionType === 'artist' ? (
                <div className="artist-section">
                  <ArtistList section={data?.sections[4]} />
                </div>
              ) : (
                <div className="artist-section">
                  <ZmSection
                    section={data?.sections[4]}
                    album={data?.sections[4].sectionType === 'playlist'}
                  />
                </div>
              )
            ) : (
              ''
            )}

            {/* playlist */}
            {!data?.sections[5] ? (
              ''
            ) : data?.sections[5]?.sectionType === 'artist' ? (
              <div className="artist-section">
                <ArtistList section={data?.sections[5]} />
              </div>
            ) : (
              <div className="artist-section">
                <ZmSection
                  section={data?.sections[5]}
                  album={data?.sections[5].sectionType === 'playlist'}
                />
              </div>
            )}

            {/* artist list */}
            {data?.sections[6] && (
              <div className="artist-section">
                <ArtistList section={data?.sections[6]} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ArtistsPage
