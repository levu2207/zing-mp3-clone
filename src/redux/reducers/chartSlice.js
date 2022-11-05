import { createSlice } from '@reduxjs/toolkit'

const chartSlice = createSlice({
  name: 'chart',

  initialState: {
    status: {
      top1: true,
      top2: false,
      top3: false,
    },
  },

  reducers: {
    hoverTop1(state) {
      state.status = {
        top1: true,
        top2: false,
        top3: false,
      }
    },

    hoverTop2(state) {
      state.status = {
        top1: false,
        top2: true,
        top3: false,
      }
    },

    hoverTop3(state) {
      state.status = {
        top1: false,
        top2: false,
        top3: true,
      }
    },
  },
})

export const { hoverTop1, hoverTop2, hoverTop3 } = chartSlice.actions
export default chartSlice.reducer
