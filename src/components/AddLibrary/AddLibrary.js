import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addFavoriteSong, removeFavoriteSong } from '../../redux/reducers/favoriteSlice'
import './library.css'

const AddLibrary = ({ song, className = '' }) => {
  const dispatch = useDispatch()
  const favoriteSongs = useSelector((state) => state.favorite.favoriteSongs)

  const handleAddOrRemoveFavorites = (data) => {
    const index = favoriteSongs.findIndex((item) => item.encodeId === data.encodeId)
    if (index === -1) {
      dispatch(addFavoriteSong(data))
      toast.success('Đã thêm bài hát vào yêu thích')
    } else {
      dispatch(
        removeFavoriteSong({
          songId: data.encodeId,
        })
      )
      toast.error('Đã xóa bài hát khỏi yêu thích')
    }
  }

  return (
    <button onClick={() => handleAddOrRemoveFavorites(song)} className={`add-library ${className}`}>
      <i className="fa-regular fa-heart "></i>
    </button>
  )
}

export default AddLibrary
