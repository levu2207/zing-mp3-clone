import { createSlice } from '@reduxjs/toolkit'

const playSlice = createSlice({
  name: 'play',

  initialState: {
    karaoke: [],
    lyrics: '',
    showKaraoke: false,
    showSidebar: false,
    showPlaylist: false,
    volume: 100,
    isMute: false,
    isLoadMusic: false,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    playItem: {},
    playList: [],
    recentMusic: [],
  },

  reducers: {
    addKaraoke(state, action) {
      state.karaoke = action.payload
    },
    addLyrics(state, action) {
      state.lyrics = action.payload
    },
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
    addPlaySong(state, action) {
      const song = action.payload
      state.playItem = song

      const index = state.recentMusic.findIndex((item) => item.encodeId === song.encodeId)
      if (index !== -1) return
      else state.recentMusic.push(song)
    },
    playSong(state) {
      state.isPlaying = true
    },
    pauseSong(state) {
      state.isPlaying = false
    },
    clearPlayItem(state) {
      state.isPlaying = false
      state.playItem = {}
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

    // add playlist
    addPlayList(state, action) {
      state.playList = action.payload
    },
    clearPlayList(state) {
      state.playList = []
    },
    clearRecentList(state) {
      state.recentMusic = []
    },
  },
})

export const {
  addKaraoke,
  addLyrics,
  showKaraoke,
  hideKaraoke,
  showSidebar,
  hideSidebar,
  showPlaylist,
  hidePlaylist,
  changeVolume,
  addPlaySong,
  playSong,
  pauseSong,
  clearPlayItem,
  addPlayList,
  clearPlayList,
  randomAction,
  repeatAction,
  onMute,
  offMute,
  startLoadMusic,
  endLoadMusic,
  clearRecentList,
} = playSlice.actions
export default playSlice.reducer
