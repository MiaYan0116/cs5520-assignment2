import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import InputScreen from './screens/InputScreen';
import Home from './Home';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { themeBackgroundColor, themeTintColor } from './style';

const Stack = createNativeStackNavigator();
export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: themeBackgroundColor
          },
          headerTintColor: themeTintColor,
        }}
      >
      <Stack.Screen 
          name='All Expenses' 
          component={Home}
          options={{ headerShown: false }}
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
    backgroundColor: themeTintColor,
    marginTop: 60,
    paddingTop: 35
  },
});
