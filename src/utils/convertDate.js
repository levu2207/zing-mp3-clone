const releaseDate = (time) => {
  const now = Date.now()
  const result = now / 1000 - time
  const convertDate = result / (24 * 60 * 60)

  if (Math.floor(convertDate) < 1) return 'Hôm nay'

  return `${Math.floor(convertDate)} ngày trước`
}

const releaseDateFormat = (time) => {
  const date = new Date(time).toLocaleDateString('en-GB')
  const newDate = date.replace('/', '.')
  return newDate.replace('/', '.')
}

const convertFollow = (number) => {
  if (number / 1000000 < 1) return `${(number / 1000).toFixed(1)}K`
  return `${(number / 1000000).toFixed(1)}M`
}

export const convertDate = {
  releaseDate,
  releaseDateFormat,
  convertFollow,
}
