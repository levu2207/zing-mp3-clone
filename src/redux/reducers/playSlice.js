import { createSlice } from '@reduxjs/toolkit'

const playSlice = createSlice({
  name: 'play',

  initialState: {
    isPlaying: false,
    playItem: {},
    playList: [],
  },

  reducers: {
    addPlaySong(state, action) {
      // state.isPlaying = true
      state.playItem = action.payload
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
  },
})

export const { addPlaySong, playSong, pauseSong, clearPlayItem } = playSlice.actions
export default playSlice.reducer
