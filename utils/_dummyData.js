import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'FlashCard:DeckList'

const dummyData = {
  //Dummy Data for testing
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
}

function setDummyData () {
  // store dummy data
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}


export function formatData (decks) {
  return decks === null // if app is loaded for 1st time
    ? setDummyData() // return dummy data
    : JSON.parse(decks) // return stored data
}