import React from 'react'
import { useSelector } from 'react-redux'
import EmptySong from './EmptySong'

const MyVideo = () => {
  const favoriteVideos = useSelector((state) => state.favorite.favoriteVideos)

  return <div>{favoriteVideos.length === 0 ? <EmptySong song={false} /> : <div></div>}</div>
}

export default MyVideo
