import React from 'react'
import Player from './Player'
import Sidebar from './Sidebar'
import Header from './Header'
import routes from '../routers/router'
import { Route, Routes } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="main bg-bg">
          <Header />
          <Routes>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.component}></Route>
            ))}
          </Routes>
        </div>
      </div>
      <Player />
    </>
  )
}

export default DefaultLayout
