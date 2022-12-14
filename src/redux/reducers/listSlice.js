import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
  name: 'list',

  initialState: {
    playItem: {},
    karaoke: [],
    lyrics: [],
    playList: [],
    recentMusic: [],
  },

  reducers: {
    addPlaySong(state, action) {
      const song = action.payload
      state.playItem = song
    },
    clearPlayItem(state) {
      state.isPlaying = false
      state.playItem = {}
    },
    // recentList
    addRecentList(state, action) {
      const song = action.payload
      if (state.recentMusic.length === 0) {
        state.recentMusic.push(song)
      }
      const index = state.recentMusic.findIndex((item) => item.encodeId === song.encodeId)
      if (index !== -1) return
      state.recentMusic.push(song)
    },
    clearRecentList(state) {
      state.recentMusic = []
    },
    // add playlist
    addPlayList(state, action) {
      state.playList = action.payload
    },
    clearPlayList(state) {
      state.playList = []
    },

    addKaraoke(state, action) {
      state.karaoke = action.payload
    },
    addLyrics(state, action) {
      state.lyrics = action.payload
    },
    clearLyrics(state) {
      state.lyrics = []
    },
    clearKaraoke(state) {
      state.karaoke = []
    },
  },
})

export const {
  clearKaraoke,
  clearLyrics,
  addKaraoke,
  addLyrics,
  addPlaySong,
  clearPlayItem,
  addPlayList,
  clearPlayList,
  addRecentList,
  clearRecentList,
} = listSlice.actions
export default listSlice.reducer
