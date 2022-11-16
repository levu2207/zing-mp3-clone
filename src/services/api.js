import axios from 'axios'

const url = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  home: '/home',
  song: '/song',
  songInfo: '/song-info',
  top100: '/top100',
  lyrics: '/lyric',
  chartPage: '/chart-home',
  newSong: '/new-chart',
  listVideo: '/video',
  artist: '/artist',
}

const instance = axios.create({
  baseURL: url.baseUrl,
  header: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Add a request interceptor
instance.interceptors.request.use((request) => {
  return request
})

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => error.response
)

const api = {
  url,
  instance,
  get: instance.get,
  promise: axios.all,
  spread: axios.spread,
}

export default api
