import React from 'react'
import { Link } from 'react-router-dom'

const Singer = ({ item }) => {
  const songs = item.song.items
  let images = []

  for (let i = 0; i < songs.length - 1; i++) {
    images.push(songs[i].thumbnailM)
  }

  return (
    <div className="section-singer-item">
      <div className="card-img relative">
        <Link to="">
          <img className="rounded" src={item.thumbnailM} alt="" />
        </Link>

        <div className="section-card-bonus absolute flex justify-center items-center">
          <svg
            name="play"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
          </svg>
        </div>
      </div>

      <div className="singer-info px-2">
        <div className="mt-3 mb-1 font-bold flex flex-col justify-center">
          <Link to="" title={item.artistsNames} className="singer-name text-center">
            {item.artistsNames}
          </Link>

          <div className="thumbs grid grid-cols-3 gap-2 mt-2 mb-1">
            {images.map((image) => (
              <div key={image.toString()} className="thumb">
                <img src={image} alt="" className="rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Singer
