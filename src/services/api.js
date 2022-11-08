import axios from 'axios'
// import store from '../redux/store'

const url = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  home: '/home',
  song: '/song',
  songInfo: '/song-info',
  top100: '/top100',
  lyrics: '/lyric',
}

const instance = axios.create({
  baseURL: url.baseUrl,
  header: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Add a request interceptor
instance.interceptors.request.use((request) => {
  // const state = store.getState()

  // if (state.auth.token) {
  //   request.headers.token = `${state.auth.token}`
  // }

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
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
}

export default api
