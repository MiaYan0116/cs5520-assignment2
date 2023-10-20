import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllExpensesScreen from './screens/AllExpensesScreen';
import InputScreen from './screens/InputScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
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
function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={AllExpensesScreen} initialParams={{itemsArray:[item1, item2]}} />
      <Tab.Screen name="Overbudget" component={AllExpensesScreen} initialParams={{itemsArray:[item2]}} />
    </Tab.Navigator>
  );
}

export default function App() {
  
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
          component={BottomTabNavigator}
          options={{
            title: 'All Expenses',
          }}
          initialParams={{ itemsArray: [item1, item2] }}
      />
      <Stack.Screen 
          name='Overbudget Expenses' 
          component={AllExpensesScreen}
          options={{
            title: 'Overbudget Expenses',
          }}
          initialParams={{ itemsArray: [item2] }}
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

  // return (
  //   <View style={styles.container}>
  //     {/* <AllExpensesScreen itemsArray={[item1, item2]}/> */}
  //     <InputScreen/>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: 60,
    paddingTop: 35
  },
});
