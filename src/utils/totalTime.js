const totalTime = (time) => {
  if (time) {
    let seconds = Math.floor(time % 60)
    if (seconds < 10) seconds = `0${seconds}`

    let minutes = Math.floor(time / 60)
    if (minutes < 10) minutes = `0${minutes}`

    return `${minutes}:${seconds}`
  } else return '00:00'
}

export default totalTime
