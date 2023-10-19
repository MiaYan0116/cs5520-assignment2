import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Label = ({label}) => {
  return(
		<Text style={styles.label}>{label}</Text>
	)
}

const styles = StyleSheet.create({
	label: {
		color: '#483D8B',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
		marginVertical: 5
	}
})

export default Label
