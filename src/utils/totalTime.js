const totalTime = (time) => {
  let seconds = Math.floor(time % 60)
  if (seconds < 10) seconds = `0${seconds}`

  let minutes = Math.floor(time / 60)
  if (minutes < 10) minutes = `0${minutes}`

  return `${minutes}:${seconds}`
}

export default totalTime
