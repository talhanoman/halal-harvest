
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './components/Welcome/Welcome';
//#e8b05c
//2b2b2b
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown : false}}>
        <Stack.Screen name="Welcome" component={Welcome}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
