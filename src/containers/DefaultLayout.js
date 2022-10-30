import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../routers/router'
import './defaultLayout.css'
import Header from './Header'
import Player from './Player/Player'
import Sidebar from './Sidebar'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <div className="zm-main relative">
          <div className="container mb-[90px]">
            <Routes>
              {routes.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.component}></Route>
              ))}
            </Routes>
          </div>
        </div>
      </div>
      <Player />
    </>
  )
}

export default DefaultLayout
