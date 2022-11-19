import React from 'react'
import { convertDate } from '../../utils/convertDate'
import truncateText from '../../utils/truncateText'
import albumDisk from '../../assets/album-disk.png'

const AlbumItem = ({ album, realDate = false }) => {
  return (
    <div className="album-item p-2.5 pl-4 flex hover:cursor-pointer">
      <div className="album-img w-[87px] h-[87px] mr-2.5 relative">
        <img
          className="w-full h-full absolute z-10 top-0 rounded"
          src={album.thumbnail}
          alt="album"
        />
        <img className="w-full h-full absolute z-1 top-0 -right-2" src={albumDisk} alt="disk" />
        <div className="album-icon w-full h-full absolute -left-2 top-0 z-10 flex justify-center items-center text-2xl ">
          <i className="fa-solid fa-play hidden" />
        </div>
      </div>

      <div className="album-info ml-3 flex flex-col justify-center">
        <p className="mb-2">{truncateText(album.title, 40)}</p>
        <p className="mb-2 text-xs text-[#FFFFFF80]">{truncateText(album.artistsNames, 40)}</p>
        <p className="text-xs text-[#FFFFFF80]">
          {realDate ? album.releaseDate : convertDate.releaseDate(album.releaseDate)}
        </p>
      </div>
    </div>
  )
}

export default AlbumItem
