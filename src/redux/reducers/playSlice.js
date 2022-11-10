import { createSlice } from '@reduxjs/toolkit'

const playSlice = createSlice({
  name: 'play',

  initialState: {
    showKaraoke: false,
    showSidebar: false,
    showPlaylist: false,
    volume: 100,
    isMute: false,
    isLoadMusic: false,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
  },

  reducers: {
    showKaraoke(state) {
      state.showKaraoke = true
    },
    hideKaraoke(state) {
      state.showKaraoke = false
    },
    showSidebar(state) {
      state.showSidebar = true
    },
    hideSidebar(state) {
      state.showSidebar = false
    },
    showPlaylist(state) {
      state.showPlaylist = true
    },
    hidePlaylist(state) {
      state.showPlaylist = false
    },
    changeVolume(state, action) {
      state.volume = action.payload
    },

    playSong(state) {
      state.isPlaying = true
    },
    pauseSong(state) {
      state.isPlaying = false
    },

    randomAction(state) {
      state.isRandom = !state.isRandom
    },
    repeatAction(state) {
      state.isRepeat = !state.isRepeat
    },
    onMute(state) {
      state.isMute = true
    },
    offMute(state) {
      state.isMute = false
    },
    startLoadMusic(state) {
      state.isLoadMusic = true
    },
    endLoadMusic(state) {
      state.isLoadMusic = false
    },
  },
})

export const {
  showKaraoke,
  hideKaraoke,
  showSidebar,
  hideSidebar,
  showPlaylist,
  hidePlaylist,
  changeVolume,
  playSong,
  pauseSong,
  randomAction,
  repeatAction,
  onMute,
  offMute,
  startLoadMusic,
  endLoadMusic,
} = playSlice.actions
export default playSlice.reducer
