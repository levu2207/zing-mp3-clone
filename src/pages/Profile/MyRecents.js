import React from 'react'
import { useSelector } from 'react-redux'
import EmptySong from './EmptySong'

const MyRecents = () => {
  const favoriteSongs = useSelector((state) => state.favorite.favoriteSongs)

  return <div>{favoriteSongs.length === 0 ? <EmptySong /> : <div></div>}</div>
}

export default MyRecents
