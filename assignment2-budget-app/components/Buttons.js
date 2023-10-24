import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import {themeBackgroundColor, buttonborderRadius, themeTintColor, buttonFontSize } from '../style'

// export const Buttons = (props) => {
//   return (
//     <View>
//      <TouchableOpacity style={styles.button} onPress={props.handlefunc}>
// 				<Text style={styles.buttonText}>{props.text}</Text>
// 			</TouchableOpacity>
//     </View>
//   )
// }
export const Buttons = (props) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgray' : themeBackgroundColor,
            borderRadius: buttonborderRadius,
            margin: 20,
            padding: 10,
            width: 150,
          },
          styles.button,
        ]}
        onPress={props.handlefunc}
      >
        {({ pressed }) => (
          <Text 
						style={[styles.buttonText, 
						{ color: pressed ? 'gray' : themeTintColor }]}
					>
            {props.text}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: themeBackgroundColor, 
		borderRadius: buttonborderRadius,
		margin: 20,
		padding: 10,
		width: 150
	},
	buttonText: {
		color: themeTintColor,
		fontSize: buttonFontSize,
		fontWeight: 'bold',
		textAlign: 'center',
	}
})
export default Buttons
