import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import glamorous from 'glamorous-native'
import { connect } from 'react-redux'
import { red, green, gray } from '../utils/colors'
import CustomButton from './CustomButton'

const CARD_FRONT = 'Front'
const CARD_BACK = 'Back'

const CenterView = glamorous.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const Card = glamorous.view({
  flex: 7,
  elevation: 3,
  padding: 10,
  alignSelf: 'stretch',
  backgroundColor: 'white',
  justifyContent: 'center',
  margin: 20,
  borderRadius: Platform.OS === 'ios' ? 16 : 7,
})

const Action = glamorous.view({
  flex: 2,
  justifyContent: 'center',
  paddingLeft: 5,
  paddingRight: 5,
  paddingBottom: 10,
})

const Question = glamorous.text({
  fontSize: 22,
  fontWeight: 'bold',
  padding: 10,
  textAlign: 'center'
})

const Answer = glamorous.text({
  fontSize: 18,
  padding: 20,
  textAlign: 'center'
})

const CardCount = glamorous.text({
  fontSize: 15,
  color: gray,
  fontWeight: 'bold',
})

class CardView extends Component {

  state = {
    cardSide: 'Front',
    ansViewed: false,
  }

  flipCard = () => {
    const side = this.state.cardSide

    if (side === CARD_FRONT) {
      this.setState(() => ({
        cardSide: CARD_BACK,
        ansViewed: true,
      }))
    }

    if (side === CARD_BACK) {
      this.setState(() => ({
        cardSide: CARD_FRONT,
      }))
    }

  }

  resetState = () => {
    this.setState(() => ({
      cardSide: CARD_FRONT,
      ansViewed: false,
    }))
  }

  pressCorrect = () => {
    const { nextCard, incrCorrectCount } = this.props

    incrCorrectCount()
    this.resetState()
    nextCard()
  }

  pressIncorrect = () => {
    const { nextCard } = this.props

    this.resetState()
    nextCard()
  }

  render(){
    const { question, answer, cardNo, totalCards } = this.props
    const { cardSide, ansViewed } = this.state

    //add card no & no of cards remaining

    return(
      <CenterView>
        <Card>
            <CardCount>{cardNo}/{totalCards}</CardCount>
            { cardSide === CARD_FRONT &&
              <CenterView style = {{flex: 1}} >
                <Question>{ question }</Question>
                <CustomButton value = 'Answer'
                  onPress = { () => this.flipCard() }
                  color={red}
                  noborder />
              </CenterView>
            }
            { cardSide === CARD_BACK &&
              <CenterView style = {{flex: 1}} >
                <Answer>{ answer }</Answer>
                <CustomButton value = 'Question'
                  onPress = { () => this.flipCard() }
                  color={red}
                  noborder />
              </CenterView>
            }
        </Card>
        <Action>
          <CustomButton value = 'Correct'
            onPress = { () => this.pressCorrect() }
            color = { green }
            fill
          />
          <CustomButton value = 'Incorrect'
            onPress = { () => this.pressIncorrect() }
            color = { red }
            fill
          />
        </Action>
      </CenterView>
    )
  }
}

function mapStateToProps (decks, { cardNo, deckId } ) {
  const { question, answer } = decks[deckId].questions[cardNo]
  const totalCards = decks[deckId].questions.length

  return{
    cardNo: cardNo + 1,
    totalCards,
    question,
    answer,
  }
}

export default connect(mapStateToProps)(CardView)