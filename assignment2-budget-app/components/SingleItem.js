import React, { useState }from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const SingleItem = ({ singleItem }) => {
  return (
    <View style={styles.itemContainer}>
			<Text style={styles.item}> {singleItem.name} </Text>
			<View style={styles.IconCostContainer}>
				<Entypo name="warning" size={24} color="yellow"/>
				<View style={styles.itemCostContainer}>
					<Text>{singleItem.quantity} * {singleItem.price}</Text>
				</View>
			</View>
    </View>
  )
}

const styles = StyleSheet.create({
	itemContainer: {
		width: '80%',
		backgroundColor: '#483D8B',
		borderRadius: 5,
		flexDirection: 'row',
		alignContent: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
		paddingVertical: 5,
		marginBottom: 15
	},
	item: {
		color: "white",
		fontSize: 22,
		fontWeight: "bold",
		
	},
	IconCostContainer: {
		flexDirection: "row",
		margin: 7,
		marginLeft: 180
	},
	itemCostContainer: {
		flexDirection: 'row',
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 3,
		justifyContent: "center",
		marginLeft: 5
	}
})
export default SingleItem
