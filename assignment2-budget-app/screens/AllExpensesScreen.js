import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import SingleItem from '../components/SingleItem'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const AllExpensesScreen = ({ navigation, route }) => {
	const itemsArray = route.params.itemsArray;
	const screenType = route.params.screenType;

	React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('Add an Expense')}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return(
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={styles.allExpensesContainer}
				data={itemsArray}
				renderItem={({item}) => {
					return(
						<SingleItem singleItem={item}/>
					)
				}}
			/>
			<View style={styles.tabButtonContainer}>
				<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
					{screenType === 'all' ? (
						<FontAwesome name="home" size={24} color="yellow" />
					): (
						<FontAwesome name="home" size={24} color="black" />
					)}
					<Text style={styles.buttonText}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {navigation.push("Overbudget Expenses")}} style={styles.button}>
        	{screenType === 'over' ? (
          	<AntDesign name="exclamation" size={24} color="yellow" />
        	) : (
          	<AntDesign name="exclamation" size={24} color="black" />
        	)}
        	<Text style={styles.buttonText}>Overbudget</Text>
      	</TouchableOpacity>
			</View>
		</View>
		
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	allExpensesContainer: {
		flex: 9,
		marginTop: 30,
		alignItems: 'center',
	},
	tabButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingHorizontal: 80,
	},
	button:{
		width: '100%',
		height: '20%',
		backgroundColor: '#483D8B',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
	}
})

export default AllExpensesScreen
