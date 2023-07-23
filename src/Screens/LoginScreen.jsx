import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ImageBackground,
} from 'react-native';
import { ButtonLogin, ButtonMoveToSignup } from '../components/Button';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import imageBg from '../../assets/photo-bg.png';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { signInwithEmail } from '../redux/operations';
import { selectUser, selectStatus } from '../redux/selectors';

import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const navigation = useNavigation();

  const { passwordVisibility, visibility, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  // const user = useSelector(selectUser);

  const onLoginPress = () => {
    if (email === '' || password === '') {
      return;
    }
    try {
      dispatch(signInwithEmail({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'isLoggedIn') {
      navigation.navigate('HomeScreen');
    }
  }, [status]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('HomeScreen');
      }
    });
  });

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={imageBg} resizeMode="cover" style={styles.image}>
          <View style={styles.login}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
              placeholder="Email"
              onChangeText={(newEmail) => setEmail(newEmail)}
              value={email}
              style={emailFocus ? styles.inputOnFocus : styles.input}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <View style={passwordFocus ? styles.passwordOnFocus : styles.password}>
              <TextInput
                placeholder="Password"
                onChangeText={(newPassword) => setPassword(newPassword)}
                value={password}
                secureTextEntry={passwordVisibility}
                autoCorrect={false}
                style={styles.passwordField}
                // enablesReturnKeyAutomatically
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <Text style={styles.visibility}>{visibility}</Text>
              </Pressable>
            </View>
            <ButtonLogin onPress={onLoginPress} />
            <View style={styles.wrapper}>
              <Text style={styles.text}>Do you have no account?</Text>
              <ButtonMoveToSignup onPress={() => navigation.navigate('RegistrationScreen')} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    marginTop: 323,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: '100%',
    height: 812,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },
  inputOnFocus: {
    borderColor: '#FF6C00',
    height: 50,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: 'center',
    color: '#212121',
  },
  password: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 43,
    width: '100%',
    flexDirection: 'row',
  },
  passwordOnFocus: {
    borderColor: '#FF6C00',
    height: 50,
    padding: 16,
    borderWidth: 1,
    marginBottom: 43,
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
  },
  passwordField: {
    width: '90%',
  },
  text: {
    textAlign: 'center',
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    marginRight: 4,
  },
  visibility: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
  wrapper: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 134,
  },
});
