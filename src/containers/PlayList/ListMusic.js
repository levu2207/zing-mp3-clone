import React from 'react'
import SongItem from '../../components/NewRelease/SongItem'

const ListMusic = ({ list }) => {
  return (
    <>
      {list === [] ? (
        <p className="text-white">Danh sách trống</p>
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
