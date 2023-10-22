import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import SingleItem from '../components/SingleItem'
import database from '../firebase/firebaseSetUp'
import { collection, onSnapshot } from 'firebase/firestore'

const AllExpensesScreen = ({route}) => {
	const [expenses, setExpenses] = useState([]);
	const screenType = route.params.screenType;
	const [overbudget, setOverbudget] = useState([]);

	console.log("overbudget: ", overbudget)
	useEffect(() => {
		onSnapshot(collection(database, "expenses"), (snapshot) => {
			setExpenses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
		});
		onSnapshot(collection(database, "overbudget"), (snapshot) => {
			setOverbudget(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
