import React from 'react'
import { Text, View, ScrollView, Platform, AsyncStorage } from 'react-native'
import { gray, teal, white, black } from '../utils/colors'
import glamorous from 'glamorous-native'
import { receiveDeckEntries } from '../actions'
import { fetchData } from '../utils/helpers'
import { connect } from 'react-redux'

const Deck = glamorous.touchableOpacity({
  flex: 1,
  height: 150,
  elevation: 2,
  borderRadius: Platform.OS === 'ios' ? 16 : 7,
  shadowRadius: 3,
  shadowOpacity: 1,
  shadowColor: 'rgba(0, 0, 0, 0.24)',
  shadowOffset: {
    width: 0,
    height: 3
  },
  backgroundColor: white,
  marginTop: 6,
  marginBottom: 2,
  marginLeft: 10,
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
})

const Title = glamorous.text({
  fontSize: 28,
  color: black,
})

const CardCount = glamorous.text({
  fontSize: 16,
  color: gray,
})

const Hint = glamorous.text({
  fontSize:10,
  color: gray,
  marginTop: 15,
})

const CenterView = glamorous.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

class DeckList extends React.Component {

  componentDidMount() {
    const { receiveData } = this.props

    //fetching data
    fetchData()
      .then((deckEntries) => receiveData(deckEntries))
  }

  render() {
    const { decks, deckArray } = this.props

    if (deckArray === null) {
      // no deck in view
      return (
        <CenterView>
          <Text>Add deck to view</Text>
        </CenterView>
      )
    }

    return (
      // Listing all decks
      <ScrollView>
        {
          deckArray.map((deck) => {
            return (          
              <Deck key = { decks[deck].title }
                onPress={() => this.props.navigation.navigate(
                  'DeckView',
                  {
                    deckId: deck,
                    deckTitle: decks[deck].title,
                  })} >
                <Title>{ decks[deck].title }</Title>
                <CardCount>{ decks[deck].questions.length } cards</CardCount>
                <Hint>Tap to open</Hint>
              </Deck>
            );
          })
        }
      </ScrollView>
    )
  }
}

function mapStateToProps (decks) {
  const deckArray = Object.keys(decks).length !== 0 ? Object.keys(decks) : null

  return {
    decks: Object.keys(decks).length !== 0
      ? decks : null,
    deckArray,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    receiveData : (deckEntries) => {
      dispatch(receiveDeckEntries(deckEntries))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList)