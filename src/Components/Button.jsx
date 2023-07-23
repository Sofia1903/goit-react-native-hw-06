import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function ButtonSignup({ onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Sign Up</Text>
    </Pressable>
  );
}

export function ButtonLogin({ onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {<Text style={styles.text}>Log In</Text>}
    </Pressable>
  );
}

export function ButtonPublishActive({ onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Publish</Text>
    </Pressable>
  );
}

export function ButtonPublishInactive({ onPress }) {
  return (
    <Pressable style={styles.buttonInactive} onPress={onPress}>
      <Text style={styles.textInactive}>Publish</Text>
    </Pressable>
  );
}

export function ButtonMoveToLogin({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.textMoveTo}>Log In</Text>
    </Pressable>
  );
}

export function ButtonMoveToSignup({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.textMoveTo}>Sign Up</Text>
    </Pressable>
  );
}

export function ButtonDeletePost({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Icon name="trash-2" size={24} />
    </Pressable>
  );
}

export function ButtonLogOut({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Icon name="log-out" size={24} />
    </Pressable>
  );
}

export function ButtonCamera({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Icon name="camera" size={24} />
    </Pressable>
  );
}

export function ButtonComment({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Icon name="arrow-up" size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInactive: {
    height: 50,
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
    fontWeight: 'bold',
  },
  textMoveTo: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    fontWeight: 'bold',
  },
  textInactive: {
    color: '#BDBDBD',
  },
});
