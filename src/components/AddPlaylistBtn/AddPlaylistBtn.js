import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPlayList, addPlaySong } from '../../redux/reducers/listSlice'

const AddPlaylistBtn = ({ data }) => {
  const dispatch = useDispatch()
  const playList = useSelector((state) => state.list.playList)
  const playItem = useSelector((state) => state.list.playItem)

  const handlePlayAlbum = () => {
    dispatch(addPlayList(data?.sections[0]?.items))

    if (playItem.encodeId !== playList[0].encodeId) {
      dispatch(addPlaySong(playList[0]))
    }
  }

  return (
    <button
      onClick={() => handlePlayAlbum()}
      className="btn uppercase py-2.5 px-6 bg-purple rounded-full mr-4 hover:opacity-80"
    >
      <i className="fa-solid fa-play mr-3"></i> phát nhạc
    </button>
  )
}

export default AddPlaylistBtn
