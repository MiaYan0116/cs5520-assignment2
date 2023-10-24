import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpensesScreen from './screens/AllExpensesScreen';
import { FontAwesome } from '@expo/vector-icons';
import {TouchableOpacity, Text} from 'react-native'

const Tab = createBottomTabNavigator();
function Home() {
  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({
				headerStyle: {
          backgroundColor: '#483D8B'
        },
        headerTintColor: '#fff',
				tabBarIcon: () => {
					let iconName;
					let color;
					if (route.name === 'Home') {
						iconName = "home";
					} else if (route.name === 'Overbudget') {
						iconName = "exclamation";
					}
					return <FontAwesome name={iconName} size={24} color={color}/>;
				},
				tabBarActiveTintColor: 'yellow',
				tabBarInactiveTintColor: '#ccc',
				tabBarStyle: { backgroundColor: '#483D8B' },
			})}
  	>
      <Tab.Screen 
				name="Home" 
				component={AllExpensesScreen} 
				initialParams={{screenType: "all"}}
				options={({ navigation, route }) => ({
					headerTitle: 'All Expenses',
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 20 }}
							onPress={() => navigation.navigate('Add an Expense')}
						>
							<Text style={{ color: 'white', fontSize: 22 }}>+</Text>
						</TouchableOpacity>
					)
				})}
			/>
      <Tab.Screen 
				name="Overbudget" 
				component={AllExpensesScreen} 
				initialParams={{screenType: "over"}}
				options={({ navigation, route }) => ({
					headerTitle: 'Overbudget Expenses',
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 20 }}
							onPress={() => navigation.navigate('Add an Expense')}
						>
							<Text style={{ color: 'white', fontSize: 22 }}>+</Text>
						</TouchableOpacity>
					)
				})}
			/>
    </Tab.Navigator>
  );
}
export default Home;