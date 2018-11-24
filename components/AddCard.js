import React, { Component } from 'react'
import glamorous from 'glamorous-native'
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native'
import { gray, teal, white, accentRed } from '../utils/colors'
import Input from './CustomTextInput'
import CustomButton from './CustomButton'
import { connect } from 'react-redux'
import { addQuestionData } from '../utils/helpers'
import { addQuestion } from '../actions'

const Form = glamorous.view({
  flex: 1,
  elevation: 3,
  alignSelf: 'stretch',
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
  marginRight: 10,
})

const Title = glamorous.text({
  fontSize:25,
  marginBottom: 60,
})

const InteractContainer =  glamorous.view({
  flex: 7,
  justifyContent: 'center',
  alignItems: 'center',
})

const Action = glamorous.view({
  flex: 2,
  flexDirection: 'row',
  alignItems: 'center',
})

const Label = glamorous.text({
  fontSize: 16,
  color: accentRed,
  alignSelf: 'flex-start',
  marginLeft: 20,
})


class NewQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    // setting title in navigator
    const { deckTitle } = navigation.state.params
    return {
      title: deckTitle,
    }
  }

  state = {
    question: '',
    answer: '',
    error: false,
  }

  handleQuestionInput = (ques) => {
  ques.trim() !== '' ?
    this.setState(() => ({
      question: ques,
    }))
  : this.setState(() => ({
      question: '',
    }))
  }

  handleAnswerInput = (ans) => {
    ans.trim() !== '' ?
      this.setState(() => ({
        answer: ans,
      }))
    : this.setState(() => ({
        answer: '',
      }))
  }

  handleAddQuestion = () => {
    let { question, answer } = this.state
    const { deckId } = this.props.navigation.state.params
    const { addNewQuestion } = this.props

    question = question.trim()
    answer = answer.trim()

    if (question === '' || answer === ''){
      // checking for empty inputs
      this.setState(() => ({
        error: true,
      }))

      return 1
    }

    const formattedQuestion = {
      question: question,
      answer: answer,
    }

    // add in async storage
    addQuestionData(deckId,question,answer)

    // back to Deck
    this.props.navigation.navigate('DeckView')

    //add in redux
    addNewQuestion(deckId,formattedQuestion)
  }

  render(){
    const { question, answer, error } = this.state
    return(
      // scroll view is added for assisting in closing keyboard
      <KeyboardAvoidingView behavior = 'padding' style = {{ flex:1, paddingBottom: 50 }} >
        <ScrollView contentContainerStyle = {{ flex:1 }}>
          <Form>
            <InteractContainer>
              <Title>Add New Card</Title>
              {error &&
                <Text style = {{backgroundColor: accentRed, color: white, padding: 5}}>Both inputs are required to be filled.</Text>}
              <Label>Question:</Label>
              <Input value = { question }
                placeholder = 'Question'
                style = {{ margin:10 }}
                multiline = { true }
                onChangeText = { (text) => this.handleQuestionInput(text) } />
              <Label>Answer:</Label>
              <Input value = { answer }
                placeholder = 'Answer...'
                style = {{ margin: 10, marginTop: 0, height: 80 }}
                multiline = { true }
                onChangeText = { (text) => this.handleAnswerInput(text) } />
            </InteractContainer>
            <Action>
              <CustomButton value = 'Submit'
                onPress = { () => this.handleAddQuestion() } 
                fill/>
            </Action>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewQuestion: (id,ques) => {
      dispatch(addQuestion(id,ques))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewQuestion)