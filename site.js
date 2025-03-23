
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function
	const getNextQuestion = () => {
		const getQestions = fetch('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple')
		const json = JASONparse(getQestions)

		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return { question, answers, correct }
	}

	// todo: create your "renderQuestion" function
	const renderQuestion = () => {
		questionElement = question
		answersElement = answers
	}

	// todo: add the event listener to the "nextQuestion" button

	nextQuestionElement.addEventListener('click', async () => {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)
	})

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
