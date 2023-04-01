import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/redux/reduxStore';
import Screens from './src/screens/Screens';

export default function App() {

  const [fontsLoaded] = useFonts({
    Kanit: require('./assets/Kanit-Regular.ttf')
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </Provider>
  );
}
