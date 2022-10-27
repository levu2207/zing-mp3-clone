import api from './api'

const getHome = () => api.get(api.url.home)

const getTop100 = () => api.get(api.url.top100)

const mp3Service = {
  getHome,
  getTop100,
}

export default mp3Service
