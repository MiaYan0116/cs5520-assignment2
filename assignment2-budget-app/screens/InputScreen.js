import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import Label from '../components/Label'
import DropDownPicker from 'react-native-dropdown-picker';
import database from '../firebase/firebaseSetUp'
import { addDoc, collection, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { themeTintColor, iconSize, buttonborderRadius } from '../style';
import { Buttons } from '../components/Buttons'

const InputScreen = ({ navigation, route }) => {
	const deleteHandler = async() =>{
		const docRef = doc(database, "expenses", route.params.id);
		Alert.alert(
			'Deletion!',
			'This item will be deleted permanently',
			[ 
				{ text: 'No', onPress: () => {
					navigation.navigate('All Expenses');
				}},
				{ text: 'Yes', onPress: async() => {
					await deleteDoc(docRef)
					navigation.navigate('All Expenses');
				}}
			]
		)
	}
	
	useEffect(() => {
		if(route.params){
			navigation.setOptions({
				headerTitle: 'Edit', 
				headerRight: () => (
					<Pressable
						style={({ pressed }) => [{ marginRight: 20, opacity: pressed ? 0.6 : 1 }]}
						onPress={deleteHandler}
					>
						{({ pressed }) => (<Ionicons name="trash" size={iconSize} color={pressed ? 'gray' : themeTintColor} />)}
					</Pressable>
				),
			});
		}
  }, [navigation, route.params]);
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [options, setOptions] = useState(generateNumberOptions(1, 10));
	const [isChecked, setIsChecked] = useState(false);

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
		if(item == '' || price == '' || quantity == '' 
			|| /[a-zA-Z]/.test(price) || /[a-zA-Z]/.test(quantity)
			|| (parseInt(price, 10) <= 0)){
			Alert.alert('invalid input', 'Please review your input')
		}
		else{
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
				if(isChecked){
					expenseData.isOverBudget = false;
				}
				Alert.alert(
					'Important!',
					'Are you sure you want to save the changes?',
					[ 
						{ text: 'No', onPress: () => {
						navigation.navigate('All Expenses');
						}},
						{ text: 'Yes', onPress: async() => {
							await setDoc(docRef, expenseData)
							navigation.navigate('All Expenses');
						}}
					]
				)
			}else{
				const docRef = collection(database, "expenses");
				await addDoc(docRef, expenseData);
				navigation.navigate('All Expenses');
			}	
		}
	}

	const toggleCheckbox = async() => {
  	setIsChecked(!isChecked); 
  };

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
			{route.params && route.params.isOverBudget && (
				<View style={styles.checkboxContainer}>
					<Text style={{marginRight: 10}}>This item is marked as overbudget. Select the checkbox if you would like to approve it.</Text>
					<Checkbox
						disabled={false}
						value={isChecked}
						onValueChange={toggleCheckbox}
					/>
					
				</View>
			)}
			<View style= {styles.buttonContainer}>
				<Buttons text= {'Cancel'} handlefunc = {cancelHandler}/>
				<Buttons text= {'Save'} handlefunc = {saveHandler}/>
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
		backgroundColor: themeTintColor,
		borderColor: themeTintColor,
		borderRadius: buttonborderRadius,
		height: 40,
		marginBottom: 20
	},
	checkboxContainer: {
		flexDirection: 'row',
		marginTop: 80,
		marginRight: 5
	},
	buttonContainer: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	
})

export default InputScreen
