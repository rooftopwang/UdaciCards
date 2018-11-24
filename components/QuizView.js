import React, { Component } from 'react'
import { View, Text } from 'react-native'
import glamorous from 'glamorous-native'
import Result from './Result'
import CardView from './CardView'
import CustomButton from './CustomButton'
import { connect } from 'react-redux'
import { accentRed } from '../utils/colors'
import { clearLocalNotification } from '../utils/helpers'

const CenterView = glamorous.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

class QuizView extends Component {

  state = {
    correct: 0,
    currentCard: 0,
  }

  componentDidMount() {
    // clear Notification when quiz starts
    clearLocalNotification()
  }

  resetState = () => {
    this.setState(() => ({
      correct: 0,
      currentCard: 0,
    }))
  }

  nextCard = () => {
    this.setState((prevState) => ({
      currentCard: prevState.currentCard + 1,
    }))
  }

  incrCorrectCount = () => {
    this.setState((prevState) => ({
      correct: prevState.correct + 1,
    }))
  }

  render(){
    const { currentCard, correct } = this.state
    const { totalCards, deckId, navigation } = this.props

    if (totalCards === 0) { // no cards in deck
      return(
        <CenterView>
          <Text>You cannot start quiz with no cards.</Text>
          <Text>Add cards to start quiz.</Text>
          <CustomButton value = 'Back'
            color = { accentRed }
            onPress = { () => navigation.goBack() }
            noborder />
        </CenterView>
      )
    }

    if (currentCard < totalCards) { // actual card view
      return(
        <View style = {{flex:1}} >
          <CardView
            cardNo = { currentCard }
            deckId = { deckId }
            nextCard = { this.nextCard }
            incrCorrectCount = { this.incrCorrectCount }
          />
        </View>
      )
    }

    if (currentCard === totalCards) { // display result
      return(
        <Result
          correct = { correct }
          totalCards = { totalCards }
          deckId = { deckId }
          navigation = { navigation }
          resetState = { this.resetState }
        />

      )
    }

    return(
      //just for kicks
      <CenterView>
        <Text>Oops!, Something went wrong. Try restart Quiz</Text>
      </CenterView>
    )

  }
}

function mapStateToProps (decks,{ navigation }) {
  const { deckId } = navigation.state.params
  const totalCards = decks[deckId].questions.length

  return {
    deckId,
    totalCards,
  }
}

export default connect(mapStateToProps)(QuizView)