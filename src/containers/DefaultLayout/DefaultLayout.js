import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../../routers/router'
import './defaultLayout.css'
import Header from '../Header/Header'
import Player from '../Player/Player'
import PlayList from '../PlayList/PlayList'
import Sidebar from '../Sidebar/Sidebar'
import Profile from '../../pages/Profile/Profile'
import MySong from '../../pages/Profile/MySongs'
import MyRecents from './../../pages/Profile/MyRecents'
import MyVideo from './../../pages/Profile/MyVideo'
import MobileMenu from './../Sidebar/MobileMenu'
import MobilePlayer from '../Player/MobilePlayer'

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