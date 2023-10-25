import React, { useState }from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import database from '../firebase/firebaseSetUp'
import { setDoc, collection } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native';

const SingleItem = ({ singleItem }) => {
	const navigation = useNavigation();
	const itemDetail = async () => {
		console.log("singleItem:",singleItem)
		navigation.navigate('Add an Expense', singleItem)
	}

  return (
    <TouchableOpacity 
			style={styles.itemContainer}
			onPress={itemDetail}
		>
			<Text style={styles.item}> {singleItem.item} </Text>
			<View style={styles.IconCostContainer}>
				<View>
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
		width: 350,
		height: 50,
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
		marginLeft: 100
	},
	itemCostContainer: {
		flexDirection: 'row',
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 3,
		justifyContent: "center",
		marginLeft: 5,
		borderRadius: 2
	}
})
export default SingleItem
