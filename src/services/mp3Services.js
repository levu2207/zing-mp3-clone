import api from './api'

const getHome = () => api.get(api.url.home)

const getTop100 = () => api.get(api.url.top100)

const getSong = (id) => api.get(`${api.url.song}/${id}`)

const getSongInfo = (id) => api.get(`${api.url.songInfo}/${id}`)

const mp3Service = {
  getHome,
  getTop100,
  getSong,
  getSongInfo,
}

export default mp3Service
