import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import SingleItem from '../components/SingleItem'
import database from '../firebase/firebaseSetUp'
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore'

const AllExpensesScreen = ({route}) => {
	const [expenses, setExpenses] = useState([]);
	const screenType = route.params.screenType;
	const [overbudget, setOverbudget] = useState([]);

	console.log("expenses: ", expenses)
	console.log("overbudget: ", overbudget)
	
	useEffect(() => {
		onSnapshot(collection(database, "expenses"), (snapshot) => {
			const newExpenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setExpenses(newExpenses);

			const newOverbudget = newExpenses.filter(item => item.isOverBudget);
			setOverbudget(newOverbudget);
		});
	}, []);

  return(
		<View style={styles.container}>
			{screenType === 'all' && 
				<FlatList
					contentContainerStyle={styles.allExpensesContainer}
					data={expenses}
					renderItem={({item}) => {
						return(
							<SingleItem singleItem={item}/>
						)
					}}
				/>
			}
			{screenType === 'over' && 
				<FlatList
					contentContainerStyle={styles.allExpensesContainer}
					data={overbudget}
					renderItem={({item}) => {
						return(
							<SingleItem singleItem={item}/>
						)
					}}
				/>
			}
			
		</View>
		
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	allExpensesContainer: {
		marginTop: 30,
		alignItems: 'center',
	},
})

export default AllExpensesScreen
