import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import homeReducer from './reducers/homeSlice'
import playReducer from './reducers/playSlice'
import chartReducer from './reducers/chartSlice'

const homePersistConfig = { key: 'home', storage }
const playPersistConfig = { key: 'play', storage }
const chartPersistConfig = { key: 'chart', storage }

const rootReducer = combineReducers({
  home: persistReducer(homePersistConfig, homeReducer),
  play: persistReducer(playPersistConfig, playReducer),
  chart: persistReducer(chartPersistConfig, chartReducer),
})
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export default store
export const persistor = persistStore(store)
