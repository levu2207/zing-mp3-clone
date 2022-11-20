import { createSlice } from '@reduxjs/toolkit'

const videoSlice = createSlice({
  name: 'video',

  initialState: {
    showVideoModal: false,
    currentVideo: {},
    videoList: [],
  },

  reducers: {
    showVideoModal(state) {
      state.showVideoModal = true
    },
    hideVideoModal(state) {
      state.showVideoModal = false
    },

    addCurrentVideo(state, action) {
      state.currentVideo = action.payload
    },

    addVideoList(state, action) {
      state.videoList = action.payload
    },
    clearVideoList(state, action) {
      state.videoList = []
    },
  },
})

export const { showVideoModal, hideVideoModal, addCurrentVideo, addVideoList, clearVideoList } =
  videoSlice.actions
export default videoSlice.reducer
