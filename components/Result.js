import React, { Component } from 'react'
import { View, Text, Platform, Animated, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import CustomButton from './CustomButton'
import glamorous from 'glamorous-native'
import { accentRed } from '../utils/colors'

const ResultContainer = glamorous.view({
  flex: 1,
  elevation: 3,
  padding: 10,
  alignSelf: 'stretch',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: 20,
  borderRadius: Platform.OS === 'ios' ? 16 : 7,
})

const ResultInfo = glamorous.view({
  flex: 2,
  padding: 10,
  justifyContent: 'space-around',
  alignItems: 'center',
  alignSelf: 'stretch',
})

const Action = glamorous.view({
  flex: 1,
  justifyContent: 'space-around',
  paddingLeft: 5,
  paddingRight: 5,
})

const Percentage = glamorous.text({
  fontSize: 50,
  fontWeight: 'bold',
  textAlign: 'center',
  color: accentRed,
})

class Result extends Component {

  state = {
    //for animation
    opacity: new Animated.Value(0),
    height: new Animated.Value(0),
    width: new Animated.Value(0),
  }

  componentDidMount() {
    const { opacity, height, width } = this.state

    Animated.timing(opacity, { toValue: 1, duration: 1500 }).start()
    Animated.spring(height, { toValue: 100, speed: 6}).start()
    Animated.spring(width, { toValue: 100, speed: 6}).start()
  }

  render(){
    const { correct, totalCards, navigation, deckId, resetState } = this.props
    const correctPercent = round(correct, totalCards) // calculating percentage
    const { opacity, height , width } = this.state

    return(
      <ResultContainer>
        <ResultInfo>
          { // different responses as per users performance
            correctPercent <= 40 &&
            <React.Fragment>
              <Animated.Image source = {require('../img/sadface.png')}
                style = {{ opacity,height,width }}
              />
              <Text style = {{fontSize: 16}}>Better luck next time</Text>
            </React.Fragment>
          }
          {
            correctPercent == 100 &&
            <React.Fragment>
              <Animated.Image source = {require('../img/100.png')}
                style = {{ opacity,height,width }}
              />
              <Text style = {{fontSize: 16}}>You nailed it</Text>
            </React.Fragment>
          }
          {
            correctPercent > 40 && correctPercent < 100 &&
            <React.Fragment>
              <Animated.Image source = {require('../img/happyface.png')}
                style = {{ opacity,height,width }}
              />
              <Text style = {{fontSize: 18}}>Great effort</Text>
            </React.Fragment>
          }
          <Percentage>{correctPercent} %</Percentage>
          <Animated.Text style = {{ opacity }} >You got { correct } cards right out of { totalCards }</Animated.Text>
        </ResultInfo>
        <Action>
          <CustomButton value = 'Restart Quiz'
            onPress = { () => {
              resetState()
              navigation.navigate(
                'QuizView',
                {
                  deckId: deckId,
                }
              )
            }}
            color = { accentRed }
            fill
          />
          <CustomButton value = 'Back to Deck'
            onPress = { () => navigation.goBack()}
          />
        </Action>
      </ResultContainer>
    )
  }
}

function round(optionVotes,totalVotes){// rounding method
  return Math.round(((optionVotes*100/totalVotes) + 0.00001) * 100) / 100
}

export default Result