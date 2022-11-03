import React from 'react'
import { Link } from 'react-router-dom'

const Singer = ({ item }) => {
  return (
    <div className="singer-item-wrapper">
      <div className="card-img relative">
        <Link to="">
          <img src={item.thumbnailM} alt="" />
        </Link>

        <div className="card-bonus absolute">
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

      <div className="singer-content">
        <div className="mt-3 mb-1 font-bold">
          <Link to="" title={item.title}>
            {item.title}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Singer
