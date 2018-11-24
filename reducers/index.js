import {
  RECEIVE_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_QUESTION,
} from '../actions'

function question (state = {}, action) {
  switch (action.type) {
    case ADD_QUESTION:
      return state.concat([action.ques])
    default :
      return state
  }
}

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case DELETE_DECK :
      const filteredDecksId = Object.keys(state).filter((deck) => deck !== action.id)
      const newDecks = {}
      filteredDecksId.map((deck) => {
        return newDecks[deck]= state[deck]
      })
      return newDecks
    case ADD_QUESTION :
      const { id } = action
      return {
        ...state,
        [id]: {
          ...state[id],
          questions: question(state[id].questions,action)
        }
      }
    default :
      return state
  }
}

export default decks