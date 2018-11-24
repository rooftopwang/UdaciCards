import React from 'react'
import glamorous from 'glamorous-native'
import { black, white } from '../utils/colors'
import { Platform, Text } from 'react-native'

const Btn = glamorous.touchableOpacity({
  flexDirection: 'row',
  margin: 2,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  height: 45,
  borderRadius: Platform.OS === 'ios' ? 7 : 2,
  justifyContent: 'center',
  alignItems: 'center',
},
  (props) => ({
    backgroundColor: props.fill &&
      (props.color ? props.color : black) ,
    borderColor: props.color ? props.color : black,
    borderWidth: props.noborder ? 0 : 1,
  })
)

const ButtonLabel = glamorous.text({
  fontSize: 16,
  textAlign: 'center',
  fontWeight: 'bold',
},
  (props) => ({
    color: props.fill ? white
      : (props.color ? props.color : black),
  })
)

const ButtonIcon = glamorous.text({},
  (props) => ({
    color: props.fill ? white
      : (props.color ? props.color : black),
  })
)

function CustomButton({ children, onPress, value, style={}, ...rest }) {
  return(
    <Btn style = { style } onPress = { onPress } { ...rest } >
      <ButtonIcon { ...rest } >{ children }</ButtonIcon>
      <ButtonLabel { ...rest } >{ value }</ButtonLabel>
    </Btn>
  )
}

export default CustomButton