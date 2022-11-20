import api from './api'

const getHome = () => api.get(api.url.home)

const getTop100 = () => api.get(api.url.top100)

const getSong = (id) => api.get(`${api.url.song}/${id}`)

const getSongInfo = (id) => api.get(`${api.url.songInfo}/${id}`)

const getLyrics = (id) => api.get(`${api.url.lyrics}/${id}`)

const getListChartPage = () => api.get(api.url.chartPage)

const getNewSongList = () => api.get(api.url.newSong)

const getListVideo = (params) => api.get(api.url.listVideo, { params })

const searchSong = (search) => api.get(api.url.song, { params: { search: search } })

const getArtistInfo = (name) => api.get(`${api.url.artist}/${name}`)

const getAlbum = (id) => api.get(`${api.url.playlist}/${id}`)

const mp3Service = {
  getHome,
  getTop100,
  getSong,
  getSongInfo,
  getLyrics,
  getListChartPage,
  getNewSongList,
  getListVideo,
  searchSong,
  getArtistInfo,
  getAlbum,
}

export default mp3Service
