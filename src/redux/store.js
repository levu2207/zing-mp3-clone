import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import homeReducer from './reducers/homeSlice'
import playReducer from './reducers/playSlice'
import favoriteReducer from './reducers/favoriteSlice'

const homePersistConfig = { key: 'home', storage }
const playPersistConfig = { key: 'play', storage }
const favoritePersistConfig = { key: 'favorite', storage }

const rootReducer = combineReducers({
  home: persistReducer(homePersistConfig, homeReducer),
  play: persistReducer(playPersistConfig, playReducer),
  favorite: persistReducer(favoritePersistConfig, favoriteReducer),
})
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export default store
export const persistor = persistStore(store)
