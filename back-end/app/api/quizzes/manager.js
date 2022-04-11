const { Quiz } = require('../../models')
const { filterQuestionsFromQuizz } = require('./questions/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  const questions = filterQuestionsFromQuizz(quiz.id)
  return { ...quiz, questions }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
  const quizzes = Quiz.get()
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}

const filterQuizzFromTheme = (themeId) => {
  const quizzes = Quiz.get()
  const parsedId = parseInt(themeId, 10)
  return quizzes.filter((quiz) => quiz.themeId === parsedId)
}

module.exports = {
  buildQuizz,
  buildQuizzes,
  filterQuizzFromTheme,
}
