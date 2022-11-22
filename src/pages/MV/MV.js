import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import DetailVideo from './DetailVideo'
import './mv.css'

const MV = () => {
  const navigate = useNavigate()
  const currentVideo = useSelector((state) => state.video.currentVideo)

  useEffect(() => {
    navigate('/the-loai-video/Viet-Nam')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let activeClassName = 'profile-nav-item uppercase py-[14px] mx-5 active-profile'
  return (
    <>
      <div className="video-nav h-12 border-b border-border-bg text-white flex justify-between items-center font-medium">
        <div className="flex justify-center items-center">
          <p className="uppercase px-5 text-2xl border-r border-text-chart-bg">MV</p>
          <NavLink
            to="Viet-Nam"
            className={({ isActive }) =>
              isActive ? activeClassName : 'profile-nav-item uppercase py-[14px] mx-5'
            }
          >
            việt nam
          </NavLink>
          <NavLink
            to="Au-My"
            className={({ isActive }) =>
              isActive ? activeClassName : 'profile-nav-item uppercase py-[14px] mx-5'
            }
          >
            us-uk
          </NavLink>
          <NavLink
            to="Han-Quoc"
            className={({ isActive }) =>
              isActive ? activeClassName : 'profile-nav-item uppercase py-[14px] mx-5'
            }
          >
            KPOP
          </NavLink>
          <NavLink
            to="Khong-Loi"
            className={({ isActive }) =>
              isActive ? activeClassName : 'profile-nav-item uppercase py-[14px] mx-5'
            }
          >
            hòa tấu
          </NavLink>
        </div>
      </div>

      <div className="video-content pt-5">
        <Outlet />
      </div>

      {Object.keys(currentVideo).length > 0 ? <DetailVideo /> : ''}
    </>
  )
}

export default MV
