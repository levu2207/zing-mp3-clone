const releaseDate = (time) => {
  const now = Date.now()
  const result = now / 1000 - time
  const convertDate = result / (24 * 60 * 60)

  if (Math.floor(convertDate) < 1) return 'Hôm nay'

  return `${Math.floor(convertDate)} ngày trước`
}

export default releaseDate
