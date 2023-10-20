import React, { useState }from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const SingleItem = ({ singleItem }) => {
	function itemDetail(){
		console.log(singleItem)
	}
  return (
    <TouchableOpacity 
			style={styles.itemContainer}
			onPress={itemDetail}
		>
			<Text style={styles.item}> {singleItem.name} </Text>
			<View style={styles.IconCostContainer}>
				<View style = {styles.iconContainer}>
					{singleItem.isOverBudget ? <Entypo name="warning" size={24} color="yellow" /> : null}
				</View>
				<View style={styles.itemCostContainer}>
					<Text>{singleItem.quantity} * {singleItem.price}</Text>
				</View>
			</View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
	itemContainer: {
		width: '90%',
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
		flex: 1,
		flexDirection: "row",
		margin: 7,
		marginLeft: 150
	},
	iconContainer: {
		flex: 1
	},
	itemCostContainer: {
		flex: 3,
		flexDirection: 'row',
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 3,
		justifyContent: "center",
		marginLeft: 5
	}
})
export default SingleItem
