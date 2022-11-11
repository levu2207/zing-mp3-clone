import React from 'react'
import SongItem from '../../components/NewRelease/SongItem'

const ListMusic = ({ list }) => {
  return (
    <>
      {list === [] ? (
        <div className="mt-[100px] flex justify-center items-center">
          <p className="text-text-second text-2xl">Danh sách trống</p>
        </div>
      ) : (
        list?.map((item) => (
          <div key={item.encodeId} className="list-music px-2">
            <SongItem
              song={item}
              notDate={true}
              height={10}
              library={true}
              playList={true}
              option={true}
            />
          </div>
        ))
      )}
    </>
  )
}

export default ListMusic
