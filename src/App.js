import './App.css'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './containers/DefaultLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<DefaultLayout />}></Route>
      </Routes>
    </>
  )
}

export default App
