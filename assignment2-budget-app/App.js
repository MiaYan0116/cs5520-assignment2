import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllExpensesScreen from './screens/AllExpensesScreen';
import InputScreen from './screens/InputScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();



export default function App() {
  const item1 = {
    name: "item1",
    quantity: 2,
    price: 100,
    isOverBudget: false
  }
  const item2 = {
    name: "item2",
    quantity: 3,
    price: 200,
    isOverBudget: true
  }
  return(
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#483D8B'
          },
          headerTintColor: '#fff',
        }}
      >
      <Stack.Screen 
          name='All Expenses' 
          component={AllExpensesScreen}
          options={{
            title: 'All Expenses',
          }}
          initialParams={{ itemsArray: [item1, item2], screenType: 'all' }}
      />
      <Stack.Screen 
          name='Overbudget Expenses' 
          component={AllExpensesScreen}
          options={{
            title: 'Overbudget Expenses',
          }}
          initialParams={{ itemsArray: [item2], screenType: 'over' }}
      />
      <Stack.Screen 
          name='Add an Expense' 
          component={InputScreen}
          options={{
            title: 'Add an Expense',
          }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: 60,
    paddingTop: 35
  },
});
