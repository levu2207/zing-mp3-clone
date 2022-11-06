import './App.css'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './containers/DefaultLayout/DefaultLayout'

function App() {
  return (
    <div className="App bg-bg">
      <Routes>
        <Route path="/*" element={<DefaultLayout />}></Route>
      </Routes>
    </div>
  )
}

export default App
