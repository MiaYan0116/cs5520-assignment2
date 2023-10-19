import React, {useState} from 'react'
import { Modal, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import Label from '../components/Label'
import DropDownPicker from 'react-native-dropdown-picker';

const InputScreen = () => {

	const [open, setOpen] = useState(false);
	const [item, setItem] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [options, setOptions] = useState(generateNumberOptions(1, 10));

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

	function saveHandler(){
		if(item == '' || price == '' || quantity == ''){
			alert('invalid input')
		}else{
			const obj = {
				item: item,
				price: price,
				amount: quantity
			}
			console.log(obj);
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
		backgroundColor: '#483D8B', // Set a background color for the buttons
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
