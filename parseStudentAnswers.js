const resultsToStudents = results => {
  const students = {}

  results.forEach(result => {
    const answers = students[result.id]
    if (answers) {
      if (answers[result.question]) {
        answers[result.question] = Math.max(answers[result.question], result.score)
      }
    } else {
      students[result.id] = {}
      students[result.id][result.question] = result.score
    }
  })

  return students
}

const convertResults = students => {
  const values = []
  const ids = []

  for (const studentId in students) {

    const questions = students[studentId]
    let totalScore = 0

    for (const questionId in questions) {
      const questionScore = questions[questionId]
      totalScore += questionScore
    }

    values.push(totalScore)
    ids.push(studentId)
  }

  return {values, ids}
}

/**
 * handle answer must return an answer object with a score property that is a number from 0 to whatever the max score is.
 */
module.exports = function(studentAnswers, handleAnswer) {

  // const handleAnswerExample = a => {
    
  //   const studentAnswer =  Object.assign({}, a)
  //   const promptString = `${studentAnswer.questionTitle}-\n${studentAnswer.answer}-\nOut Of ${studentAnswer.outOf}:\n`
  //   const resultPrompt = readlineSync.question(promptString)
  //   studentAnswer.score = parseInt(resultPrompt) || 0

  //   return studentAnswer
  // }

  const finalResults = studentAnswers.map(handleAnswer)
  const students = resultsToStudents(finalResults)
  const {values, ids} = convertResults(students)

  return {values, ids, students};
}