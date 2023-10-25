import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpensesScreen from './screens/AllExpensesScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Pressable } from 'react-native'
import { iconSize, themeBackgroundColor, themeTintColor, buttonActiveColor, buttonInactiveColor } from './style';

const Tab = createBottomTabNavigator();
function Home() {
  return (
    <Tab.Navigator 
      screenOptions={({route}) => ({
				headerStyle: {
          backgroundColor: themeBackgroundColor
        },
        headerTintColor: themeTintColor,
				tabBarIcon: ({ focused }) => {
					let iconName;
					let tabIconColor = focused ? buttonActiveColor : buttonInactiveColor;
					if (route.name === 'Home') {
						iconName = "home";
					} else if (route.name === 'Overbudget') {
						iconName = "exclamation";
					}
					return <FontAwesome name={iconName} size={iconSize} color={ tabIconColor }/>;
				},
				tabBarActiveTintColor: buttonActiveColor,
				tabBarInactiveTintColor: themeTintColor,
				tabBarStyle: { backgroundColor: themeBackgroundColor },
			})}
  	>
      <Tab.Screen 
				name="Home" 
				component={AllExpensesScreen} 
				initialParams={{screenType: "all"}}
				options={({ navigation }) => ({
					headerTitle: 'All Expenses',
					headerRight: () => (
						<Pressable
							style={({ pressed }) => [{ marginRight: 20, opacity: pressed ? 0.6 : 1 }]}
							onPress={() => navigation.navigate('Add an Expense')}
						>
							{({ pressed }) => (<Entypo name="plus" size={iconSize} color={pressed ? buttonInactiveColor : themeTintColor} />)}
						</Pressable>
					)
				})}
			/>
      <Tab.Screen 
				name="Overbudget" 
				component={AllExpensesScreen} 
				initialParams={{screenType: "over"}}
				options={({ navigation }) => ({
					headerTitle: 'Overbudget Expenses',
					headerRight: () => (
						<Pressable
							style={({ pressed }) => [
								{
									marginRight: 20,
									backgroundColor: pressed ? buttonInactiveColor : 'transparent', 
									borderRadius: 5,
									padding: 10,
								},
							]}
							onPress={() => navigation.navigate('Add an Expense')}
						>
							{({ pressed }) => (<Entypo name="plus" size={iconSize} color={pressed ? buttonInactiveColor : themeTintColor} />)}
						</Pressable>
					)
				})}
			/>
    </Tab.Navigator>
  );
}
export default Home;