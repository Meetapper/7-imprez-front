import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { styles } from "../constants";
import TextInputLabel from "../components/TextInputLabel";
import Logo from "../components/Logo";
import { Button, Dialog, Portal, Snackbar, Text } from "react-native-paper";
import { usePostData } from "../utils/hooks";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/actions/userActions";

const Login = ({ navigation, route }) => {
  const [successSnackbar, setSuccessSnackbar] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const {loading, error, data, postData, reset} = usePostData('/auth/signin');

  useEffect(() => {
    if (route?.params?.success && successSnackbar === null) {
      setSuccessSnackbar(true);
    }
  }, [route.params]);

  useEffect(() => {
    if (data && !error) {
      dispatch(setUserData(data));

      navigation.replace('Home');
    }
  }, [data]);

  const handleLogin = () => {
    if (!username.length || !password.length) {
      setDialog('Invalid credentials');
      return null;
    }

    postData({username, password});
  }

  if (!dialog && error) {
    setDialog(error.message);
  }

  return (
    <View style={style.container}>
      <Logo color="#000" logoStyle={style.logo}/>
      <View style={{ ...styles.centeredFlex, ...style.inputContainer }}>
        <TextInputLabel
          value={username}
          onChange={text => setUsername(text)}
          topLabel="Username"
          mode="outlined"
          label={null}
        />
        <TextInputLabel
          value={password}
          onChange={text => setPassword(text)}
          topLabel="Password"
          mode="outlined"
          label={null}
          password
        />
        <Button mode='contained' style={style.button} onPress={() => handleLogin()} loading={loading}>
          Log In
        </Button>
        <Text style={style.signUp}>
          Don't have an account?
        </Text>
        <Button mode='outlined' style={style.button} onPress={() => {navigation.navigate('SignUp'); setSuccessSnackbar(null)}}>
          Sign Up
        </Button>
      </View>
      <Snackbar
        visible={successSnackbar}
        onDismiss={() => setSuccessSnackbar(false)}
        action={{
          label: 'Close',
          onPress: () => setSuccessSnackbar(false),
        }}>
        User registered successfully!
      </Snackbar>
      <Portal>
        <Dialog visible={!!dialog} onDismiss={() => {setDialog(null); reset()}}>
          {/* <Dialog.Title>Alert</Dialog.Title> */}
          <Dialog.Content>
            <Text variant="bodyMedium">{dialog}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {setDialog(null); reset();}}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    marginTop: 60
  },
  inputContainer: {
    padding: 20,
    rowGap: 20
  },
  text: {
    width: '100%'
  },
  button: {
    width: '90%'
  },
  signUp: {
    marginTop: 10
  }
});

export default Login;