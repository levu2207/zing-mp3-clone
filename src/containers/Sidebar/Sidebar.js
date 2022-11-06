import React from 'react'
import './sidebar.css'
import logo from '../../logo.svg'
import iconLogo from '../../assets/icon_zing_mp3.svg'

import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { hideSidebar, showSidebar } from '../../redux/reducers/playSlice'

const Sidebar = () => {
  const show = useSelector((state) => state.play.showSidebar)
  const dispatch = useDispatch()

  const handleShowSidebar = () => {
    show ? dispatch(hideSidebar()) : dispatch(showSidebar())
  }

  return (
    <div className={`zm-sidebar bg-sidebar ${show ? 'show' : ''}`}>
      <div className="zm-sidebar-wrapper flex flex-col h-full">
        {/* logo */}
        <Link to="/" className={`zm-brand ${show ? 'show' : ''}`}>
          <img name="icon" src={iconLogo} alt="" className="zm-icon w-[120px] h-10 hidden" />
          <img name="logo" src={logo} alt="failed" className="zm-logo w-[120px] h-10" />
        </Link>

        {/* menu */}
        <div className="zm-menu text-[13px] font-bold text-text-sidebar">
          <NavLink
            to="/mymusic"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03A3.003 3.003 0 0111 18c-1.66 0-3-1.34-3-3z" />
            </svg>

            <span>Cá nhân</span>
          </NavLink>

          <NavLink
            to="/home"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              role="img"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <path d="M20.788 3.832c-.101-.105-.197-.213-.301-.317-.103-.103-.211-.202-.32-.302A11.903 11.903 0 0 0 12 0a11.926 11.926 0 0 0-8.486 3.514C-1.062 8.09-1.16 15.47 3.213 20.168c.099.108.197.214.3.32.104.103.21.2.317.3A11.92 11.92 0 0 0 12 24c3.206 0 6.22-1.247 8.487-3.512 4.576-4.576 4.673-11.956.301-16.656zm-16.655.301A11.057 11.057 0 0 1 12 .874c2.825 0 5.49 1.048 7.55 2.958l-1.001 1.002A9.646 9.646 0 0 0 12 2.292a9.644 9.644 0 0 0-6.865 2.844A9.644 9.644 0 0 0 2.292 12c0 2.448.9 4.753 2.542 6.549L3.831 19.55C-.201 15.191-.101 8.367 4.133 4.133zm13.798 1.318v.002l-1.015 1.014A7.346 7.346 0 0 0 12 4.589 7.357 7.357 0 0 0 6.761 6.76 7.362 7.362 0 0 0 4.589 12a7.34 7.34 0 0 0 1.877 4.913l-1.014 1.016A8.77 8.77 0 0 1 3.167 12a8.77 8.77 0 0 1 2.588-6.245A8.771 8.771 0 0 1 12 3.167c2.213 0 4.301.809 5.931 2.284zM18.537 12c0 1.745-.681 3.387-1.916 4.622S13.746 18.538 12 18.538a6.491 6.491 0 0 1-4.296-1.621l-.001-.004c-.11-.094-.22-.188-.324-.291a6.027 6.027 0 0 1-.293-.326A6.47 6.47 0 0 1 5.466 12c0-1.746.679-3.387 1.914-4.621A6.488 6.488 0 0 1 12 5.465c1.599 0 3.105.576 4.295 1.62.111.096.224.19.326.295.104.104.2.214.295.324A6.482 6.482 0 0 1 18.537 12zM7.084 17.534h.001A7.349 7.349 0 0 0 12 19.413a7.35 7.35 0 0 0 5.239-2.174A7.354 7.354 0 0 0 19.412 12a7.364 7.364 0 0 0-1.876-4.916l1.013-1.012A8.777 8.777 0 0 1 20.834 12a8.765 8.765 0 0 1-2.589 6.246A8.764 8.764 0 0 1 12 20.834a8.782 8.782 0 0 1-5.93-2.285l1.014-1.015zm12.783 2.333A11.046 11.046 0 0 1 12 23.125a11.042 11.042 0 0 1-7.551-2.957l1.004-1.001a9.64 9.64 0 0 0 6.549 2.542 9.639 9.639 0 0 0 6.865-2.846A9.642 9.642 0 0 0 21.71 12a9.64 9.64 0 0 0-2.543-6.548l1.001-1.002c4.031 4.359 3.935 11.182-.301 15.417z" />
            </svg>

            <span>Khám phá</span>
          </NavLink>

          <NavLink
            to="/zing-chart"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z" />
            </svg>

            <span>#zingchart</span>
          </NavLink>

          <NavLink
            to="/radio"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M227.346 21.72C166.6 21.42 106.33 48.002 65.633 99.272c-70.398 88.68-55.576 217.634 33.103 288.032 6.407 5.09 13.482 9.924 20.276 14.13C46.694 328.73 38.35 211.73 103.664 129.462c65.31-82.275 181.147-100.695 268.36-46.756-5.63-5.66-11.952-11.454-18.358-16.54-37.412-29.7-81.993-44.23-126.32-44.448zm40.79 68.012c-17.173-.17-34.464 4.025-50.984 13.588l.13.237-3.91 1.95c32.484 65.062 44.2 140.54 37.956 217.565-16.43-21.657-45.042-39.13-74.498-43.38-40.71-5.87-67.6 15.738-60.06 48.265 7.542 32.527 46.656 63.654 87.365 69.525 33.316 4.805 57.36-8.8 60.87-31.726h.005c8.48-53.158 9.01-106.548.57-157.475 59.49-1.135 110.173 84.413 71.965 171.062 80.733-78.593 6.76-226.6-81.28-213.508-1.872-6.79-3.92-13.516-6.144-20.176 76.357-22.337 165.25 73.996 134.405 190.856C461.34 235.536 366.66 90.718 268.137 89.732zm119.83 14.264c74.538 70.422 86.508 187.106 23.778 271.363-62.724 84.26-177.937 106.267-266.78 55.062 5.804 5.48 12.3 11.076 18.862 15.96 90.823 67.61 219.258 48.798 286.867-42.028 67.612-90.823 48.798-219.256-42.025-286.868-6.56-4.887-13.783-9.498-20.703-13.49z" />
            </svg>

            <span>Radio</span>
          </NavLink>

          <NavLink
            to="/the-loai-nghe-si"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z" />
              <path d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z" />
            </svg>

            <span>Theo dõi</span>
          </NavLink>

          <div className="sidebar-divide"></div>

          <NavLink
            to="/moi-phat-hanh"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
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
              <path d="M9 18V5l12-2v13" />
              <circle cx={6} cy={18} r={3} />
              <circle cx={18} cy={16} r={3} />
            </svg>

            <span>Nhạc mới</span>
          </NavLink>

          <NavLink
            to="/hub"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
            </svg>

            <span>Thể loại</span>
          </NavLink>

          <NavLink
            to="/top100"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
            </svg>

            <span>Top 100</span>
          </NavLink>

          <NavLink
            to="/the-loai-video"
            className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
          >
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 002 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 00-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z" />
            </svg>

            <span>MV</span>
          </NavLink>

          {/* my music */}
          <div className="my-music mt-5">
            <p className={`sidebar-library uppercase px-[25px] ${show ? 'show' : ''}`}>Thư viện</p>
            <NavLink
              to="/mymusic/song"
              className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="0783s0j89a" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#3CA2FF" />
                    <stop offset="100%" stopColor="#008FFF" />
                  </linearGradient>
                  <linearGradient id="prx3tly02b" x1="21.839%" x2="21.839%" y1="43.679%" y2="100%">
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="100%" stopColor="#FFF" stopOpacity=".9" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g>
                    <g>
                      <path
                        fill="url(#0783s0j89a)"
                        d="M.516 7.143c.812-3.928 3.31-6.115 7.207-6.776 2.88-.489 5.762-.495 8.637.014 4.012.709 6.424 3.024 7.192 7.011.594 3.082.603 6.196-.009 9.274-.821 3.9-3.384 6.309-7.266 6.967-2.88.489-5.762.495-8.637-.014-4.012-.709-6.435-3.14-7.203-7.127-.624-3.102-.564-6.235.08-9.349z"
                        transform="translate(-21 -433) translate(21 433)"
                      />
                      <path
                        fill="url(#prx3tly02b)"
                        d="M3.995 9.479c-.245.48-.245 1.11-.245 2.371v3.3c0 1.26 0 1.89.245 2.371.216.424.56.768.984.984.48.245 1.11.245 2.371.245h9.3c1.26 0 1.89 0 2.372-.245.423-.216.767-.56.983-.983.245-.482.245-1.112.245-2.372v-3.3c0-1.26 0-1.89-.245-2.371-.216-.424-.56-.768-.983-.984-.482-.245-1.112-.245-2.372-.245h-9.3c-1.26 0-1.89 0-2.371.245-.424.216-.768.56-.984.984zm8.567.571l.06.004.068.015.057.02.017.008c.556.27 1.067.623 1.516 1.046.075.07.148.142.22.217.172.18.166.464-.014.636-.18.172-.464.167-.636-.013-.061-.063-.123-.125-.187-.185-.202-.19-.42-.365-.65-.521v3.442c0 1.025-.832 1.856-1.857 1.856S9.3 15.744 9.3 14.719c0-1.025.831-1.856 1.856-1.856.35 0 .677.096.957.264V10.5c0-.249.201-.45.45-.45z"
                        transform="translate(-21 -433) translate(21 433)"
                      />
                      <path
                        fill="#FFF"
                        fillOpacity=".6"
                        fillRule="nonzero"
                        d="M7.5 5.25c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75h-9z"
                        transform="translate(-21 -433) translate(21 433)"
                      />
                      <path
                        fill="#FFF"
                        fillOpacity=".9"
                        fillRule="nonzero"
                        d="M6 6.75c0-.414.336-.75.75-.75h10.5c.414 0 .75.336.75.75H6z"
                        transform="translate(-21 -433) translate(21 433)"
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <span className="font-normal text-sm">Bài hát</span>
            </NavLink>

            <NavLink
              to="/mymusic/mv"
              className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="ghd4ngt38a" x1="50%" x2="50%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#9FD465" />
                    <stop offset="100%" stopColor="#70B129" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g>
                    <g>
                      <path
                        fill="url(#ghd4ngt38a)"
                        d="M.516 7.143c.812-3.928 3.31-6.115 7.207-6.776 2.88-.489 5.762-.495 8.637.014 4.012.709 6.424 3.024 7.192 7.011.594 3.082.603 6.196-.009 9.274-.821 3.9-3.384 6.309-7.266 6.967-2.88.489-5.762.495-8.637-.014-4.012-.709-6.435-3.14-7.203-7.127-.624-3.102-.564-6.235.08-9.349z"
                        transform="translate(-21 -467) translate(21 467)"
                      />
                      <path
                        stroke="#FFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13.5 11.5h5m-5 3h5M6 17.5h12.5"
                        transform="translate(-21 -467) translate(21 467)"
                      />
                      <path
                        fill="#FFF"
                        d="M10.786 4.025c-.053-.016-.11-.025-.167-.025-.316 0-.572.262-.572.585v4.782c-.532-.44-1.21-.704-1.948-.704C6.387 8.663 5 10.082 5 11.831 5 13.581 6.387 15 8.099 15c1.711 0 3.099-1.419 3.099-3.169 0-.074-.003-.147-.007-.22l.001-6.04c.534.336 1.033.728 1.49 1.169.114.109.225.22.334.337.218.233.58.24.808.017.228-.223.235-.593.017-.826-.123-.131-.247-.257-.375-.38-.766-.738-1.64-1.355-2.589-1.826l-.091-.037z"
                        transform="translate(-21 -467) translate(21 467)"
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <span className="font-normal text-sm">Playlist</span>
            </NavLink>

            <NavLink
              to="/mymusic/history"
              className={`zm-menu-item px-[25px] flex items-center ${show ? 'show' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="v6mduhifwa" x1="50%" x2="50%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD677" />
                    <stop offset="100%" stopColor="#F7AA45" />
                  </linearGradient>
                  <linearGradient
                    id="dkfkk30hhb"
                    x1="21.205%"
                    x2="21.205%"
                    y1="43.042%"
                    y2="100.632%"
                  >
                    <stop offset="0%" stopColor="#FFF" />
                    <stop offset="100%" stopColor="#FFF" stopOpacity=".9" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g>
                    <g>
                      <path
                        fill="url(#v6mduhifwa)"
                        d="M.516 7.143c.812-3.928 3.31-6.115 7.207-6.776 2.88-.489 5.762-.495 8.637.014 4.012.709 6.424 3.024 7.192 7.011.594 3.082.603 6.196-.009 9.274-.821 3.9-3.384 6.309-7.266 6.967-2.88.489-5.762.495-8.637-.014-4.012-.709-6.435-3.14-7.203-7.127-.624-3.102-.564-6.235.08-9.349z"
                        transform="translate(-21 -569) translate(21 569)"
                      />
                      <path
                        fill="url(#dkfkk30hhb)"
                        d="M12 3.75c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75zm3.805 12.388c-.13.13-.301.195-.472.195-.17 0-.341-.065-.47-.195l-3.334-3.333c-.126-.125-.196-.294-.196-.472V8c0-.369.299-.667.667-.667.368 0 .667.298.667.667v4.057l3.138 3.138c.26.261.26.682 0 .943z"
                        transform="translate(-21 -569) translate(21 569)"
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <span className="font-normal text-sm">Gần đây</span>
            </NavLink>
          </div>
        </div>

        {/* playlist */}
        <button
          onClick={() => handleShowSidebar()}
          className="show-sidebar text-sm text-white h-[40px] w-[40px] rounded-full bg-text-chart-bg hover:bg-hover-chart-bg hidden"
        >
          {show ? (
            <i className="fa-solid fa-chevron-left"></i>
          ) : (
            <i className="fa-solid fa-chevron-right"></i>
          )}
        </button>
        <button className="sidebar-playlist h-[54px] w-full px-7 border-t border-border">
          <i className="fa-regular fa-plus text-[18px] text-white mr-2.5" />
          <span className="text-white">Tạo playlist mới</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
