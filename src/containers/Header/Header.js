import React from 'react'
import './header.css'

const Header = () => {
  return (
    <header className="header h-[70px] bg-bg fixed left-0 top-0 right-0 pl-[290px] flex justify-center items-center z-20 pr-[380px] transition-all duration-700">
      <div className="level">
        <div className="header-left">
          <button className="pr-5">
            <svg
              className="text-2xl text-white"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </button>

          <button className="pr-5">
            <svg
              className="text-2xl text-white"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </button>

          <form className="search w-full max-w-[540px]">
            <div className="search-container h-10 flex items-center">
              <button className="search-btn px-2.5">
                <svg
                  className="text-3xl text-white"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                </svg>
              </button>

              <div className="input-wrapper w-full">
                <input
                  className="w-full bg-transparent text-white py-1 outline-none"
                  type="text"
                  placeholder="Tìm kiếm bài hát, nghệ sĩ, lời..."
                />
              </div>
            </div>
          </form>
        </div>
        <div className="header-right">
          <button className="header-btn mx-3 w-10 h-10 flex justify-center items-center">
            <svg
              className="text-xl text-purple text-center"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 144l48 64 64-32-16 304c64 16 192 16 256 0l-16-304 64 32 48-64-112-96-48-16c-16 64-112 64-128 0l-48 16z" />
            </svg>

            <div className="header-title">Chủ đề</div>
          </button>

          <button className="header-btn mr-3 w-10 h-10 flex justify-center items-center">
            <i className="fa-solid fa-star text-xl text-text-sidebar"></i>
            <div className="header-title w-[220%]">Nâng cấp VIP</div>
          </button>

          <button className="header-btn mr-3 w-10 h-10 flex justify-center items-center">
            <svg
              className="text-xl text-text-sidebar"
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1={12} y1={3} x2={12} y2={15} />
            </svg>

            <div className="header-title">Tải lên</div>
          </button>

          <button className="header-btn relative mr-3 w-10 h-10 flex justify-center items-center">
            <i className="fa-solid fa-gear text-xl text-text-sidebar"></i>
            <div className="header-title">Cài đặt</div>
          </button>

          <button className="header-btn w-10 h-10 flex justify-center items-center">
            <i className="fa-solid fa-user text-xl text-text-sidebar"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
