import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import SingleItem from '../components/SingleItem'

const AllExpensesScreen = ({ navigation, route }) => {
	const itemsArray = route.params.itemsArray;
	console.log(route.params);
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
		<FlatList
			contentContainerStyle={styles.allExpensesContainer}
			data={itemsArray}
			renderItem={({item}) => {
				return(
					<SingleItem singleItem={item}/>
				)
			}}
		/>
	)
}

const styles = StyleSheet.create({
	allExpensesContainer: {
		marginTop: 30,
		alignItems: 'center',
	}
})

export default AllExpensesScreen
