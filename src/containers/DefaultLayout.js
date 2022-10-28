import React from 'react'
import Player from './Player'
import Sidebar from './Sidebar'
import Header from './Header'
import routes from '../routers/router'
import { Route, Routes } from 'react-router-dom'
import './defaultLayout.css'

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
