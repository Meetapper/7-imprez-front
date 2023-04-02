import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './src/redux/reduxStore';
import Screens from './src/screens/Screens';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);

export default function App() {

  const [fontsLoaded] = useFonts({
    Kanit: require('./assets/Kanit-Regular.ttf')
  })

  if (!fontsLoaded) {
    return null;
  }

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#000',
      accent: '#f1c40f',
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
