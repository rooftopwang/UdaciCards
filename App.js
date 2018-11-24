import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { white, accentRed, lightGray, gray, black } from './utils/colors'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import CreateNewDeck from './components/CreateNewDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import QuizView  from './components/QuizView'
import { setLocalNotification } from './utils/helpers'


function CustomStatusBar ({backgroundColor, ...props}) {
  return ( // custom bar
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const tabRouteConfig = {
  // routes for tab navigator
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='dashboard' size={24} color={tintColor} />
    },
  },
  CreateNewDeck: {
    screen: CreateNewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={24} color={tintColor} />
    }
  }
}

const tabNavigatorConfig = {
  //tab nav properties
  navigationOptions : {
    header: null,
  },
  tabBarPosition: 'top',
  tabBarOptions: {
    showIcon: false,
    labelStyle: {
      fontSize: 15,
    },
    indicatorStyle:{
      height: 1,
      backgroundColor: black,
    },
    activeTintColor: black,
    inactiveTintColor: gray,
    style: {
      height: 55,
      backgroundColor:  white,
      elevation: 5,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
}

const Tabs = createMaterialTopTabNavigator(tabRouteConfig, tabNavigatorConfig)

const stackRouteConfig = {
  //routes for stack navigator
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      header: null,
    }
  }
}

const MainNavigator = createStackNavigator(stackRouteConfig)

const store = createStore(reducer) //Initialize store

export default class App extends Component {

  componentDidMount() {
    //set Notification
    setLocalNotification()
  }

  render() {
    return (
      <Provider store = { store } >
        <View style = {{ flex:1, backgroundColor: lightGray }}>
          <CustomStatusBar backgroundColor = { black } barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}