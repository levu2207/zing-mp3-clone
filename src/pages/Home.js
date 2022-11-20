import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner/Banner'
import SkeletonLoading from '../components/Loading/SkeletonLoading'
import NewRelease from '../components/NewRelease/NewRelease'
import NewSong from '../components/NewRelease/NewSong'
import Partners from '../components/Partners/Partners'
import TopSinger from '../components/TopSinger/TopSinger'
import WeekChart from '../components/WeekChart/WeekChart'
import ZingChart from '../components/ZingChart/ZingChart'
import ZmSection from '../components/ZmSection/ZmSection'
import {
  loadAfterNewSong,
  loadAlbumArtist,
  loadArtistSpotlight,
  loadBanner,
  loadDayDes,
  loadNewMusicEveryDay,
  loadNewRelease,
  loadNewSong,
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

  const dayDes = useSelector((state) => state.home.dayDes)
  const newMusicEveryDay = useSelector((state) => state.home.newMusicEveryDay)
  const top100 = useSelector((state) => state.home.top100)
  const xoneConner = useSelector((state) => state.home.albumArtist)
  const newSong = useSelector((state) => state.home.newSong)
  const afterNewSong = useSelector((state) => state.home.afterNewSong)

  useEffect(() => {
    document.querySelector('.zm-container').scrollTo(0, 0)
  }, [])

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
      setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <div className="section home">
          <Banner />

          <NewRelease />

          <ZmSection section={dayDes} />

          <TopSinger />

          <ZmSection section={newMusicEveryDay} />

          <ZingChart />

          <WeekChart />

          <ZmSection section={top100} />

          <ZmSection section={xoneConner} />

          <NewSong section={newSong} />

          <ZmSection section={afterNewSong} />

          <Partners />

          <div className="author flex flex-col justify-center items-center text-center pt-8 pb-[122px] text-md text-text-second">
            <div className="flex">
              <span>Made with</span>
              <span className="mx-1 text-red-900">
                <i className="fa-solid fa-heart"></i>
              </span>
            </div>
            <span>Clone Zing MP3 Powered by Lê Vũ</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
