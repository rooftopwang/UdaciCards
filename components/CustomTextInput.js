import React from 'react'
import { Platform, Dimensions } from 'react-native'
import { black } from '../utils/colors'
import glamorous from 'glamorous-native'

const CustomTextInput = glamorous.textInput({
  width: Dimensions.get('window').width - 40,
  height: 50,
  borderRadius: Platform.OS === 'ios'
    ? 9
    : 5,
  borderWidth: Platform.OS === 'ios'
    ? 1
    : 0,
  borderColor: black,
  paddingLeft: 10,
  paddingRight: 10,
  fontSize: 16,
  paddingBottom: Platform.OS === 'ios'
    ? 3
    : 8,
})

export default CustomTextInput