import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ComingSoon from '../../components/ComingSoon/ComingSoon'
import ListMV from '../../pages/MV/ListMV'
import MV from '../../pages/MV/MV'
import MySong from '../../pages/Profile/MySongs'
import Profile from '../../pages/Profile/Profile'
import routes from '../../routers/router'
import Header from '../Header/Header'
import MobilePlayer from '../Player/MobilePlayer'
import Player from '../Player/Player'
import PlayList from '../PlayList/PlayList'
import Sidebar from '../Sidebar/Sidebar'
import MyRecents from './../../pages/Profile/MyRecents'
import MyVideo from './../../pages/Profile/MyVideo'
import MobileMenu from './../Sidebar/MobileMenu'
import './defaultLayout.css'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="flex w-full relative">
        <Sidebar />
        <MobileMenu />
        <div className="zm-main relative">
          <div className="zm-container">
            <Routes>
              <Route path="/mymusic" element={<Profile />}>
                <Route path="song" element={<MySong />} />
                <Route path="mv" element={<MyVideo />} />
                <Route path="history" element={<MyRecents />} />
              </Route>
              <Route path="/the-loai-video" element={<MV />}>
                <Route path="Viet-Nam" element={<ListMV />} />
                <Route path="Au-My" element={<ComingSoon />} />
                <Route path="Han-Quoc" element={<ComingSoon />} />
                <Route path="Khong-Loi" element={<ComingSoon />} />
              </Route>
              {routes.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.component}></Route>
              ))}
            </Routes>
          </div>
        </div>
        <PlayList />
      </div>
      <MobilePlayer />
      <Player />
    </>
  )
}

export default DefaultLayout
