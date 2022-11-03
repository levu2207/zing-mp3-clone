import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import gifPlay from '../../assets/icon-playing.gif'
import {
  addPlaySong,
  endLoadMusic,
  pauseSong,
  playSong,
  startLoadMusic,
} from '../../redux/reducers/playSlice'
import mp3Service from '../../services/mp3Services'
import releaseDate from '../../utils/releaseDate'
import truncateText from '../../utils/truncateText'
import AddLibrary from '../AddLibrary/AddLibrary'
import Loading from '../Loading/Loading'
import Option from '../Option/Option'

const SongItem = ({
  song,
  height = 'full',
  notDate = false,
  library,
  playList = false,
  option,
  hover = '',
}) => {
  const [loadMusic, setLoadMusic] = useState(false)
  const playItem = useSelector((state) => state.play.playItem)
  const isPlaying = useSelector((state) => state.play.isPlaying)
  const dispatch = useDispatch()

  const handlePlay = (item) => {
    const audio = document.getElementById('audio')
    if (playItem.encodeId === item.encodeId) {
      if (isPlaying) {
        audio.pause()
        dispatch(pauseSong())
      } else {
        audio.play()
        dispatch(playSong())
      }
    } else {
      audio.pause()
      dispatch(pauseSong())
      dispatch(startLoadMusic())

      // get source music
      if (item.source) {
        dispatch(playSong())
      } else {
        setLoadMusic(true)
        dispatch(addPlaySong(item))
        mp3Service.getSong(item.encodeId).then((res) => {
          if (res.err === 0) {
            const source = res.data['128']

            dispatch(
              addPlaySong({
                ...item,
                source,
              })
            )
          } else if (res.err === -1110) {
            toast.success('Không load được link nhạc từ sever của mp3...do mình gà quá')
          }

          audio.play()
          dispatch(playSong())
          setLoadMusic(false)
          dispatch(endLoadMusic())
        })
      }
    }
  }

  return (
    <div
      className={`song-item ${hover} h-full ${
        playItem.encodeId === song.encodeId ? (playList ? 'active-play-list' : 'active-play') : ''
      } p-2.5 flex justify-between`}
    >
      <div className="flex">
        <div className="song-img mr-2.5 relative">
          <img className={`h-${height} rounded`} src={song.thumbnail} alt="song" />
          <div
            onClick={() => handlePlay(song)}
            className="play-icon text-white w-full h-full absolute top-0 z-10 flex justify-center items-center text-2xl "
          >
            {playItem.encodeId === song.encodeId && isPlaying ? (
              <img className="w-[18px] h-[18px]" src={gifPlay} alt="gifPlay" />
            ) : loadMusic ? (
              <Loading width="18px" height="18px" color="#FFFFFF" />
            ) : (
              <i
                className={`fa-solid fa-play ${
                  playItem.encodeId === song.encodeId && !isPlaying ? '' : 'hidden'
                }`}
              />
            )}
          </div>
        </div>

        <div className="song-info text-white flex flex-col justify-center">
          <span className="song-title inline-block ">
            {song.streamingStatus === 2 ? (
              <>
                <span className="mb-1 inline-block mr-1">{truncateText(song.title, 15)}</span>
                <span className="inline-block">
                  <svg
                    width="26px"
                    height="12px"
                    viewBox="0 0 26 12"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <title>label VIP</title>
                    <g id="Symbols" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                      <g
                        id="Header/vip"
                        transform="translate(-1024.000000, -50.000000)"
                        fillRule="nonzero"
                      >
                        <g id="icon-header" transform="translate(813.500000, 12.000000)">
                          <g id="ava" transform="translate(200.000000, 0.000000)">
                            <g id="Group" transform="translate(9.000000, 37.000000)">
                              <g id="small-vip" transform="translate(2.000000, 1.000000)">
                                <rect
                                  id="Rectangle-Copy-2"
                                  fill="#FFDB00"
                                  x={0}
                                  y={0}
                                  width={25}
                                  height={12}
                                  rx={3}
                                />
                                <path
                                  d="M7.33807531,9.2 C6.96903766,9.2 6.71422594,8.99790795 6.57364017,8.66401674 L4.5790795,3.89288703 C4.53514644,3.7874477 4.5,3.68200837 4.5,3.56778243 C4.5,3.18995816 4.79874477,2.9 5.17656904,2.9 C5.52803347,2.9 5.75648536,3.10209205 5.86192469,3.37447699 L7.39958159,7.35481172 L8.95481172,3.33054393 C9.04267782,3.11087866 9.27991632,2.9 9.60502092,2.9 C9.97405858,2.9 10.2728033,3.18117155 10.2728033,3.55020921 C10.2728033,3.65564854 10.2376569,3.76987448 10.2025105,3.84895397 L8.19037657,8.66401674 C8.04979079,8.99790795 7.79497908,9.2 7.42594142,9.2 L7.33807531,9.2 Z M12.0545328,8.47949791 L12.0545328,3.57656904 C12.0545328,3.19874477 12.3532775,2.9 12.7311018,2.9 C13.1089261,2.9 13.4076708,3.19874477 13.4076708,3.57656904 L13.4076708,8.47949791 C13.4076708,8.85732218 13.1089261,9.15606695 12.7311018,9.15606695 C12.3532775,9.15606695 12.0545328,8.85732218 12.0545328,8.47949791 Z M15.6287308,8.47949791 L15.6287308,3.6292887 C15.6287308,3.25146444 15.9274756,2.95271967 16.3052998,2.95271967 L18.1417015,2.95271967 C19.6090655,2.95271967 20.4965132,3.82259414 20.4965132,5.0790795 L20.4965132,5.09665272 C20.4965132,6.52008368 19.3894003,7.258159 18.0099023,7.258159 L16.9818689,7.258159 L16.9818689,8.47949791 C16.9818689,8.85732218 16.6831241,9.15606695 16.3052998,9.15606695 C15.9274756,9.15606695 15.6287308,8.85732218 15.6287308,8.47949791 Z M16.9818689,6.05439331 L18.0538354,6.05439331 C18.7304044,6.05439331 19.1258019,5.65020921 19.1258019,5.12301255 L19.1258019,5.10543933 C19.1258019,4.49916318 18.7040446,4.17405858 18.0274756,4.17405858 L16.9818689,4.17405858 L16.9818689,6.05439331 Z"
                                  id="VIP-Copy"
                                  fill="#362800"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </>
            ) : (
              <span className="mb-1 inline-block mr-1">{truncateText(song.title, 24)}</span>
            )}
          </span>

          <p className="mb-1 text-xs text-[#FFFFFF80]">{truncateText(song.artistsNames, 20)}</p>
          {!notDate && <p className="text-xs text-[#FFFFFF80]">{releaseDate(song.releaseDate)}</p>}
        </div>
      </div>

      <div className="song-bonus items-center hidden">
        <AddLibrary className={library ? '' : 'hidden'} />
        <Option className={option ? '' : 'hidden'} />
      </div>
    </div>
  )
}

export default SongItem
