const checkIsFavorite = (list, data) => {
  const index = list.findIndex((item) => item.encodeId === data.encodeId)
  if (index === -1) {
    return false
  } else return true
}

export default checkIsFavorite
