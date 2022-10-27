import React from 'react'
import { useEffect } from 'react'
import mp3Service from '../services/mp3Services'

const Home = () => {
  useEffect(() => {
    mp3Service.getHome().then((res) => {
      console.log(res)
    })

    mp3Service.getTop100().then((res) => {
      console.log(res)
    })
  }, [])

  return <div className="home"></div>
}

export default Home
