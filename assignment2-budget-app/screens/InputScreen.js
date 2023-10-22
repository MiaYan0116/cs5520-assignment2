import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import Label from '../components/Label'
import DropDownPicker from 'react-native-dropdown-picker';
import database from '../firebase/firebaseSetUp'
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import { Ionicons } from '@expo/vector-icons';

const InputScreen = ({ navigation, route }) => {
	console.log("INPUT: ",route.params);
	useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Edit', 
      headerRight: () => (
        <TouchableOpacity
					style={{ marginRight: 20 }}
					onPress={() => {console.log("trash clicked")}}
					>
					<Ionicons name="trash" size={24} color="white" />
				</TouchableOpacity>
      ),
    });
  }, [navigation]);
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [options, setOptions] = useState(generateNumberOptions(1, 10));

	useEffect(() => {
		if (route.params) {
			setItem(route.params.item);
			setQuantity(route.params.quantity.toString());
			setPrice(route.params.price.toString());
		}
	}, [route.params]);

  function generateNumberOptions(start, end) {
    const options = [];
    for (let number = start; number <= end; number += 1) {
      options.push({ label: `${number}`, value: `${number}` });
    }
    return options;
  }

	function changeItemHandler(item){
		console.log(item);
		setItem(item);
	}

	function changePriceHandler(price){
		console.log(price);
		setPrice(price);
	}

	function cancelHandler(){
		setItem("");
		setPrice('');
		setQuantity('');
	}

	const saveHandler = async() => {
		if(item == '' || price == '' || quantity == ''){
			alert('invalid input')
		}else{
			const intPrice = parseInt(price, 10);
			const intQuantity = parseInt(quantity, 10)
			const expenseData = {
				item: item,
				price: intPrice,
				quantity: intQuantity,
				isOverBudget: intPrice * intQuantity > 500
			}
			
			if(route.params){
				const docRef = doc(database, "expenses", route.params.id);
				const docRefOver = doc(database, "overbudget", route.params.id);
				await setDoc(docRef, expenseData);
				if(expenseData.isOverBudget === true){
					await setDoc(docRefOver, expenseData);
				}
			}else{
				const docRef = collection(database, "expenses");
				const docRefOver = collection(database, "overbudget")
				await addDoc(docRef, expenseData);
				if(expenseData.isOverBudget === true){
					await addDoc(docRefOver, expenseData);
				}
			}
			
			navigation.navigate('All Expenses');
			cancelHandler();
		}
	}

  return(
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<Label label="Item *"/>
				<TextInput style={styles.inputs} onChangeText={changeItemHandler} value={item}/>
				<Label label="Unit Price *"/>
				<TextInput style={styles.inputs} onChangeText={changePriceHandler} value={price}/>
				<Label label="Quantity *"/>
				<DropDownPicker
					style={[styles.inputs]}
					open={open}
					value={quantity}
					items={options}
					setOpen={setOpen}
					setValue={setQuantity}
					setItems={setOptions}
					multiple={false}
					scrollViewProps={{ maxHeight: 20 }}
				/>
			</View>
			<View style= {styles.buttonContainer}>
				<TouchableOpacity style={styles.button} onPress={cancelHandler}>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText} onPress={saveHandler}>Save</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 30,
		marginHorizontal: 30,
		justifyContent: 'center'
	},
	inputContainer: {
		flex: 3
	},
	inputs: {
		backgroundColor: 'white',
		borderColor: 'white',
		borderRadius: 5,
		height: 40,
		marginBottom: 20
	},
	buttonContainer: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	button: {
		backgroundColor: '#483D8B', 
		borderRadius: 5,
		margin: 20,
		padding: 10,
		width: 150
	},
	buttonText: {
		color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
	}
})

export default InputScreen
