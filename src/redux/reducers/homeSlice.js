import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banner: [],
    newRelease: [],
    dayDes: [],
    topSinger: [],
    newMusicEveryDay: [],
    zingChart: [],
    weekChart: [],
    artistSpotlight: [],
    top100: [],
    newSong: [],
    afterNewSong: [],
    albumArtist: [],
    radio: [],
    event: [],
  },
  reducers: {
    loadBanner(state, action) {
      const banner = action.payload
      state.banner = banner
    },

    loadNewRelease(state, action) {
      const newRelease = action.payload
      state.newRelease = newRelease
    },

    loadDayDes(state, action) {
      const dayDes = action.payload
      state.dayDes = dayDes
    },

    loadTopSinger(state, action) {
      const topSinger = action.payload
      state.topSinger = topSinger
    },

    loadNewMusicEveryDay(state, action) {
      const newMusicEveryDay = action.payload
      state.newMusicEveryDay = newMusicEveryDay
    },

    loadZingChart(state, action) {
      const zingChart = action.payload
      state.zingChart = zingChart
    },

    loadWeekChart(state, action) {
      const weekChart = action.payload
      state.weekChart = weekChart
    },

    loadArtistSpotlight(state, action) {
      const artistSpotlight = action.payload
      state.artistSpotlight = artistSpotlight
    },

    loadTop100(state, action) {
      const top100 = action.payload
      state.top100 = top100
    },

    loadNewSong(state, action) {
      const newSong = action.payload
      state.newSong = newSong
    },

    loadAfterNewSong(state, action) {
      const afterNewSong = action.payload
      state.afterNewSong = afterNewSong
    },

    loadAlbumArtist(state, action) {
      const albumArtist = action.payload
      state.albumArtist = albumArtist
    },

    loadRadio(state, action) {
      const radio = action.payload
      state.radio = radio
    },

    loadEvent(state, action) {
      const event = action.payload
      state.event = event
    },
  },
})

export const {
  loadBanner,
  loadNewRelease,
  loadDayDes,
  loadTopSinger,
  loadNewMusicEveryDay,
  loadZingChart,
  loadWeekChart,
  loadArtistSpotlight,
  loadTop100,
  loadNewSong,
  loadAfterNewSong,
  loadAlbumArtist,
  loadRadio,
  loadEvent,
} = homeSlice.actions
export default homeSlice.reducer
