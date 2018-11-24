import { AsyncStorage } from 'react-native'
import { formatData, DECK_STORAGE_KEY } from './_dummyData'
import { Notifications, Permissions } from 'expo'

//key for notification
const NOTIFICATION_KEY = 'FlashCard:Notifications'

export function fetchData () {
  // fetching Data on App open
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      return formatData(decks)
    })
}

function formatDeck (deckTitle) {
  const deck_key =  deckTitle.replace(/\s/g,'_')
  // formatting data for DB/store
  return {
    [deck_key] : {
      title: deckTitle,
      questions: [],
    }
  }
}

export function addDeckData (deckTitle) {
  const deck = formatDeck(deckTitle)
  // adding new deck
  AsyncStorage.mergeItem(DECK_STORAGE_KEY,JSON.stringify(deck))

  return deck
}

export function deleteDeckData (id) {
  // overwritting data to delete deck
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      const deckList = JSON.parse(decks)
      deckList[id] = undefined
      delete deckList[id]
      AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(deckList))
    })
}

export function addQuestionData (id,ques,ans) {
  const arrToAdd = [{
    question: ques,
    answer: ans,
  }]
  // overwritting data to add question/answer
  AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((decks) => {
    const deckData = JSON.parse(decks)
    deckData[id] = {
      ...deckData[id],
      questions: deckData[id].questions.concat(arrToAdd)
    }
    AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(deckData))
  })
}

function createNotification () {
  // Initializing notification data/properties
  return {
    title: 'Start a Quiz!',
    body: "👋 don't forget to test yourself today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  // setting notification for next day
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      if (data === null) {
        // asking for permission to send notification
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()


              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
            else {// permission rejected or undetermined
              alert('You will not receive any notifications. Permission can be provided to app in settings.')
            }
          })
      }
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}