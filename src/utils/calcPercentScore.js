const calcPercentScore = (total, score) => {
  if (!total || !score) return
  return `${Math.round((score / total) * 100)}%`
}
export default calcPercentScore
