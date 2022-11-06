import { createSlice } from '@reduxjs/toolkit'

const favoriteSlice = createSlice({
  name: 'favorite',

  initialState: {
    favoriteSongs: [],
    favoriteVideos: [],
  },

  reducers: {
    addFavoriteSong(state, action) {
      //  newFavoriteSong = song item
      const newFavoriteSong = action.payload
      const index = state.favoriteSongs.findIndex(
        (item) => item.encodeId === newFavoriteSong.encodeId
      )
      if (index !== -1) return
      state.favoriteSongs.push(newFavoriteSong)
    },
    removeFavoriteSong(state, action) {
      const { songId } = action.payload
      state.favoriteSongs = state.favoriteSongs.filter((item) => item.encodeId !== songId)
    },

    addFavoriteVideo(state, action) {
      //  newFavoriteVideo = Video item
      const newFavoriteVideo = action.payload
      const index = state.favoriteVideos.findIndex(
        (item) => item.encodeId === newFavoriteVideo.encodeId
      )
      if (index !== -1) return
      state.favoriteVideos.push(newFavoriteVideo)
    },
    removeFavoriteVideo(state, action) {
      const { videoId } = action.payload
      state.favoriteVideos = state.favoriteVideos.filter((item) => item.encodeId !== videoId)
    },

    clearFavoriteSongs(state) {
      state.favoriteSongs = []
    },
    clearFavoriteVideos(state) {
      state.favoriteVideos = []
    },
  },
})

export const {
  addFavoriteSong,
  addFavoriteVideo,
  removeFavoriteSong,
  removeFavoriteVideo,
  clearFavoriteSongs,
  clearFavoriteVideos,
} = favoriteSlice.actions
export default favoriteSlice.reducer
