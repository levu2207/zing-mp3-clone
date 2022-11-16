import ArtistsPage from '../pages/Artists/ArtistsPage'
import ChartHome from '../pages/ChartHome/ChartHome'
import Home from '../pages/Home'
import Hub from '../pages/Hub'
import NewMusic from '../pages/NewMusic/NewMusic'
import NotFound from '../pages/NotFound'
import Radio from '../pages/Radio'
import Social from '../pages/Social'
import Top100 from '../pages/Top100'

const routes = [
  { path: '/', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/zing-chart', component: <ChartHome /> },
  { path: '/radio', component: <Radio /> },
  { path: '/the-loai-nghe-si', component: <Social /> },
  { path: '/moi-phat-hanh', component: <NewMusic /> },
  { path: '/hub', component: <Hub /> },
  { path: '/top100', component: <Top100 /> },
  { path: '/nghe-si/:alias', component: <ArtistsPage /> },
  { path: '*', component: <NotFound /> },
]

export default routes
