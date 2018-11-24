export const RECEIVE_DECKS = 'RECEIVE_ENTRIES'
export const ADD_DECK = 'ADD_ENTRY'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_DECK = 'DELETE_DECK'

export function receiveDeckEntries (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addQuestion (id,ques) {
  return {
    type: ADD_QUESTION,
    id,
    ques,
  }
}

export function deleteDeck (id) {
  return {
    type: DELETE_DECK,
    id,
  }
}