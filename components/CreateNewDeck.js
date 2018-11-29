import React, { Component } from 'react'
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import glamorous from 'glamorous-native'
import { white, teal, red } from '../utils/colors'
import Input from './CustomTextInput'
import CustomButton from './CustomButton'
import { addDeckData } from '../utils/helpers'
import { addDeck } from '../actions'
import { connect } from 'react-redux'

const Form = glamorous.view({
  flex: 1,
  paddingTop: 80,
  elevation: 3,
  alignSelf: 'stretch',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
  marginRight: 10,
})

const InteractContainer =  glamorous.view({
  flex: 7,
  justifyContent: 'center',
  alignItems: 'center'
})

const Action = glamorous.view({
  flex: 3,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 5,
})

const Title = glamorous.text({
  fontSize:28,
  marginBottom: 30,
  marginLeft: 15,
  marginRight: 15,
  textAlign: 'center'
})


class CreateNewDeck extends Component {
  state={
    title: '',
  }

  handleChange = (value) => {
    value.trim() !== '' ?
      this.setState(() => ({
        title: value,
      }))
    : this.clearInput()
    // not allowing starting spaces to be entered
  }

  clearInput = () => {
    this.setState(() => ({
      title: '',
    }))
  }

  handleSubmit = () => {
    const deckTitle = this.state.title.trim()
    const { addNewDeck, navigation } = this.props

    //adding deck in async storage and providing it to redux
    addNewDeck(addDeckData(deckTitle))

    this.clearInput()

    //navigate to deck list view
    navigation.goBack()
    navigation.navigate(
      'DeckView',
      {
        deckId: deckTitle,
        deckTitle: deckTitle,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior = 'padding' style = {{flex:1}} >
        <Form>
          <InteractContainer>
            <Title>What is the title of your new deck?</Title>
            <Input value = { this.state.title }
              placeholder = 'Title'
              onChangeText = {(text) => this.handleChange(text)}
            />
          </InteractContainer>
          <Action>
          {
            // <CustomButton
            //   style = {{ flex: 1 }}
            //   color = { red }
            //   value = 'Clear'
            //   onPress = { () => this.clearInput() }
            // />
          }
            <CustomButton style={{ flex: 2 }}
              onPress = { () => this.handleSubmit() }
              value = 'Submit'
              fill 
            />
          </Action>
        </Form>
      </KeyboardAvoidingView>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewDeck: (deck) => {
      dispatch(addDeck(deck))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateNewDeck)