import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login';
// Signup Screens
import Signup from './screens/Signup/Signup';
import SignupOptions from './screens/Signup/SignupOptions';
import SellerSignup from './screens/Signup/SellerSignup';
import ServiceProviderSignup from './screens/Signup/ServiceProviderSignup';
import CustomerSignup from './screens/Signup/CustomerSignup';
//#e8b05c
//2b2b2b
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupOptions" component={SignupOptions} />
        <Stack.Screen name="SellerSignup" component={SellerSignup} />
        <Stack.Screen name="ServiceProviderSignup" component={ServiceProviderSignup} />
        <Stack.Screen name="CustomerSignup" component={CustomerSignup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
