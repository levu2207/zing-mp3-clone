import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import homeReducer from './reducers/homeSlice'

const homePersistConfig = { key: 'home', storage }

const rootReducer = combineReducers({
  home: persistReducer(homePersistConfig, homeReducer),
})
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export default store
export const persistor = persistStore(store)
