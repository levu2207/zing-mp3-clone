import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './profile.css'
import { useDispatch } from 'react-redux'
import { clearFavoriteSongs, clearFavoriteVideos } from '../../redux/reducers/favoriteSlice'
import { toast } from 'react-toastify'

const Profile = () => {
  const dispatch = useDispatch()

  let activeClassName = 'profile-nav-item uppercase py-4 mr-10 active-profile'

  const handleClearList = () => {
    dispatch(clearFavoriteSongs())
    dispatch(clearFavoriteVideos())
    toast.success('Xóa thành công')
    console.log('da xoa')
  }

  return (
    <div className="section profile pt-16 h-100vh">
      <div className="profile-header h-12 flex justify-start items-center mb-12">
        <div className="text-[40px] font-bold text-white mr-2">Thư viện</div>
        <button className="w-10 h-10 flex justify-center items-center bg-purple rounded-full hover:bg-opacity-80">
          <i className="fa-solid fa-play text-lg text-white"></i>
        </button>
      </div>

      <div className="profile-nav border-b border-border text-white flex justify-between items-center font-medium">
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
          className="px-3 py-1 border border-border rounded-full hover:bg-text-chart-bg text-xs"
        >
          Xóa danh sách
        </button>
      </div>

      <Outlet />
    </div>
  )
}

export default Profile
