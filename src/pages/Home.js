import axios from 'axios'
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
    axios
      .get(
        'https://zingmp3.vn/api/v2/song/get/streaming?id=Z6W8AIO9&ctime=1667277878&version=1.7.53&sig=c6d589e391b84c27e9d0c14c5bac9089bbf75d251b2fca2d58d8097cc6689fe012fea39c10b6c5618d4d78a0380207e853d3b32adb266c71ac4c16546a30616b&apiKey=X5BM3w8N7MKozC0B85o4KMlzLZKhV00y'
      )
      .then((res) => {
        console.log(res)
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
