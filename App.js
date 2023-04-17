
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react'
// import { AuthProvider } from './AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import {auth} from './firebase'
//#e8b05c
//2b2b2b
export default function App() {
  const Stack = createNativeStackNavigator();
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])
  return (
    <NavigationContainer>      
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>      
    </NavigationContainer>
  );
}
