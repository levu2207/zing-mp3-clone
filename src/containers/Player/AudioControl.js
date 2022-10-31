import React from 'react'

const AudioControl = () => {
  return (
    <>
      <div className="audio-control h-[50px] flex justify-center items-center text-white">
        <button className="audio-shuffle audio-btn">
          <i className="fa-solid fa-shuffle"></i>
        </button>
        <button className="audio-prev audio-btn">
          <i className="fa-solid fa-backward-step"></i>
        </button>
        <button className="audio-play">
          <i className="fa-solid fa-play"></i>
          <i className="fa-solid fa-pause hidden"></i>
        </button>
        <button className="audio-next audio-btn">
          <i className="fa-solid fa-forward-step"></i>
        </button>
        <button className="audio-random audio-btn text-2xl">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={0}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3701 7.99993L13.8701 10.598V8.99993H6.88989V12.9999H4.88989V6.99993H13.8701V5.40186L18.3701 7.99993Z"
              fill="currentColor"
            />
            <path
              d="M10.1299 16.9999H19.1101V10.9999H17.1101V14.9999H10.1299V13.4019L5.62988 15.9999L10.1299 18.598V16.9999Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="progress-bar"></div>
    </>
  )
}

export default AudioControl
