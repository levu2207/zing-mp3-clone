import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearFavoriteSongs, clearFavoriteVideos } from '../../redux/reducers/favoriteSlice'
import { clearRecentList } from '../../redux/reducers/playSlice'
import './profile.css'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let activeClassName = 'profile-nav-item uppercase py-4 mr-10 active-profile'

  useEffect(() => {
    navigate('/mymusic/song')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClearList = () => {
    const url = window.location
    if (url.pathname === '/mymusic/history') {
      dispatch(clearRecentList())
    } else if (url.pathname === '/mymusic/song') {
      dispatch(clearFavoriteSongs())
    } else {
      dispatch(clearFavoriteVideos())
    }
    toast.success('Xóa thành công')
  }

  return (
    <div className="section profile h-100vh">
      <div className="profile-header h-12 flex justify-start items-center mb-12">
        <div className="text-[40px] font-bold text-white mr-2">Thư viện</div>
        <button className="w-10 h-10 flex justify-center items-center bg-purple rounded-full hover:bg-opacity-80">
          <i className="fa-solid fa-play text-lg text-white"></i>
        </button>
      </div>

      <div className="profile-nav border-b border-border-bg text-white flex justify-between items-center font-medium">
        <div className="flex justify-center items-center">
          <NavLink
            to="song"
            className={({ isActive }) =>
              isActive ? activeClassName : 'profile-nav-item uppercase py-4 mr-10'
            }
          >
            Bài hát
          </NavLink>
          <NavLink
            to="mv"
            className={({ isActive }) =>
              isActive ? activeClassName : 'profile-nav-item uppercase py-4 mr-10'
            }
          >
            MV
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) =>
              isActive ? activeClassName : 'profile-nav-item uppercase py-4 mr-10'
            }
          >
            Gần đây
          </NavLink>
        </div>

        <button
          onClick={() => handleClearList()}
          className="px-3 py-1 border border-border-bg rounded-full hover:bg-text-chart-bg text-xs"
        >
          Xóa danh sách
        </button>
      </div>

      <Outlet />
    </div>
  )
}

export default Profile
