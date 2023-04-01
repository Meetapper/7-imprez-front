import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Logo from "../components/Logo";
import TextInputLabel from "../components/TextInputLabel";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { styles } from "../constants";
import { usePostData } from "../utils/hooks";

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [dialog, setDialog] = useState(null);

  const {loading, error, data, postData, reset} = usePostData('/auth/signup', () => navigation.navigate('Login', {success: 'Sign Up successfull!'}));

  const handleSignUp = () => {
    if (!email.length ||
      !username.length ||
      !password.length ||
      !repeatPassword) {
        setDialog('Please fill all of the input fields!');
        return null;
    }

    if (password.length < 6) {
      setDialog('Password must be at least 6 characters!');
      return null;
    }

    if (password !== repeatPassword) {
      setDialog('Passwords do not match!');
      return null;
    }

    postData({email, username, password});
  }

  if (!dialog && error) {
    setDialog(error.message);
  }

  return (
    <View style={style.container}>
      <Logo color="#000" logoStyle={style.logo}/>
      <View style={{ ...styles.centeredFlex, ...style.inputContainer, marginTop: 80 }}>
        <TextInputLabel
          value={email}
          onChange={text => setEmail(text)}
          topLabel="Your Email"
          mode="outlined"
          label={null}
        />
        <TextInputLabel
          value={username}
          onChange={text => setUsername(text)}
          topLabel="Choose Username"
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
        <TextInputLabel
          value={repeatPassword}
          onChange={text => setRepeatPassword(text)}
          topLabel="Repeat Password"
          mode="outlined"
          label={null}
          password
        />
        <Button mode='contained' style={style.button} onPress={() => handleSignUp()} loading={loading}>
          Sign Up
        </Button>
      </View>
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

export default SignUp;