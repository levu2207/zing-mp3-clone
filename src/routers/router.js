import Home from '../pages/Home'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import ZingChart from '../pages/ZingChart'
import Radio from '../pages/Radio'
import Social from '../pages/Social'
import NewMusic from '../pages/NewMusic'
import Hub from '../pages/Hub'
import Top100 from '../pages/Top100'
import MV from '../pages/MV'

const routes = [
  { path: '/', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/ca-nhan', component: <Profile /> },
  { path: '/zing-chart', component: <ZingChart /> },
  { path: '/radio', component: <Radio /> },
  { path: '/the-loai-nghe-si', component: <Social /> },
  { path: '/moi-phat-hanh', component: <NewMusic /> },
  { path: '/hub', component: <Hub /> },
  { path: '/top100', component: <Top100 /> },
  { path: '/the-loai-video', component: <MV /> },
  { path: '*', component: <NotFound /> },
]

export default routes
