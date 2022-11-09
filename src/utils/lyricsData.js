// lyrics data

const parseLyric = (lrc) => {
  // will match "[00:00.00] ooooh yeah!"
  // note: i use named capturing group
  const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/

  // split lrc string to individual lines
  const lines = lrc.split('\n')
  const output = []

  lines.forEach((line) => {
    const match = line.match(regex)

    // if doesn't match, return.
    if (match == null) return

    const { time, text } = match.groups

    output.push({
      time: parseTime(time),
      text: text.trim(),
    })
  })

  // parse formated time
  // "03:24.73" => 204.73 (total time in seconds)
  function parseTime(time) {
    const minsec = time.split(':')

    const min = parseInt(minsec[0]) * 60
    const sec = parseFloat(minsec[1])

    return min + sec
  }

  return output
}

// lyrics (Array) - output from parseLyric function
// time (Number) - current time from audio player
const syncLyric = (lyrics, time) => {
  const scores = []

  lyrics.forEach((lyric) => {
    // get the gap or distance or we call it score
    const score = time - lyric.time

    // only accept score with positive values
    if (score >= 0) scores.push(score)
  })

  if (scores.length === 0) return null

  // get the smallest value from scores
  const closest = Math.min(...scores)

  // return the index of closest lyric
  return scores.indexOf(closest)
}

const syncKaraoke = (karaoke, time) => {
  const scores = []

  karaoke.forEach((line) => {
    // get the gap or distance or we call it score
    const score = time - line.words[0].startTime / 1000

    // only accept score with positive values
    if (score >= 0) scores.push(score)
  })

  if (scores.length === 0) return null

  // get the smallest value from scores
  const closest = Math.min(...scores)

  // return the index of closest lyric
  return scores.indexOf(closest)
}

export const lyricsData = {
  syncLyric,
  parseLyric,
  syncKaraoke,
}
