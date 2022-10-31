import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Banner from '../components/Banner/Banner'
import NewRelease from '../components/NewRelease/NewRelease'
import {
  loadAfterNewSong,
  loadAlbumArtist,
  loadArtistSpotlight,
  loadBanner,
  loadDayDes,
  loadEvent,
  loadNewMusicEveryDay,
  loadNewRelease,
  loadNewSong,
  loadRadio,
  loadTop100,
  loadTopSinger,
  loadWeekChart,
  loadZingChart,
} from '../redux/reducers/homeSlice'
import mp3Service from '../services/mp3Services'
import './home.css'

const Home = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mp3Service.getHome().then((res) => {
      dispatch(loadBanner(res.data.items[0]))
      dispatch(loadNewRelease(res.data.items[3]))
      dispatch(loadDayDes(res.data.items[4]))
      dispatch(loadTopSinger(res.data.items[5]))
      dispatch(loadNewMusicEveryDay(res.data.items[6]))
      dispatch(loadZingChart(res.data.items[7]))
      dispatch(loadWeekChart(res.data.items[8]))
      dispatch(loadArtistSpotlight(res.data.items[9]))
      dispatch(loadTop100(res.data.items[10]))
      dispatch(loadNewSong(res.data.items[11]))
      dispatch(loadAfterNewSong(res.data.items[12]))
      dispatch(loadAlbumArtist(res.data.items[14]))
      dispatch(loadRadio(res.data.items[15]))
      dispatch(loadEvent(res.data.items[16]))
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading ? (
        <p>dang loading</p>
      ) : (
        <div className="home w-full h-full">
          <Banner />

          <NewRelease />
        </div>
      )}
    </>
  )
}

export default Home
