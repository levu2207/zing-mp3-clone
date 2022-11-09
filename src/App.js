import { Route, Routes } from 'react-router-dom'
import './App.css'
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
