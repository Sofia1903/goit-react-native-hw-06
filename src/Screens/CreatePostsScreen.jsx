import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { ButtonPublishActive, ButtonPublishInactive, ButtonDeletePost } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { LocationIcon } from '../../assets/SvgIcons';

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors';

import { collection, addDoc } from 'firebase/firestore';

import { storage, db } from '../firebase/config';

export default function CreatePostsScreen() {
  const [name, setName] = useState('');
  const [locationName, setLocationName] = useState('');
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);

  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, [imageUri]);

  function toggleCameraType() {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log(uri);
      setImageUri(uri);
      // await MediaLibrary.createAssetAsync(uri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      return asset;
    }
  };

  const createPost = async () => {    
    try {
      const post = {
        imageUri: imageUri,
        location:location,
        imageName: name,
        locationName: locationName,
        // postId: Date.now().toString(),                      
      };     
      const docRef = await addDoc(collection(db, 'users', user.uid, 'posts'), post);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };  

  return (
    <View style={styles.container}>
      {!imageUri && (
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
          <View style={styles.photoView}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <View style={styles.takePhotoOut}>
                <View style={styles.takePhotoInner}></View>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.flipContainer} onPress={toggleCameraType}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </Camera>
      )}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.postPhoto} />}
      <Text style={styles.text}>Upload photo</Text>
      <TextInput
        placeholder="Name..."
        onChangeText={(newName) => setName(newName)}
        value={name}
        style={styles.input}
      />
      <View style={styles.location}>
        {LocationIcon}
        <TextInput
          placeholder="Location"
          onChangeText={(newLocationName) => setLocationName(newLocationName)}
          value={locationName}
          style={styles.inputLocation}
        />
      </View>
      {!imageUri && <ButtonPublishInactive disabled={true} />}
      {imageUri && (
        <ButtonPublishActive
          onPress={() => {
            console.log(user.uid);
            createPost();
            navigation.navigate('PostsScreen', { imageUri, location, name, locationName });
            setImageUri(null);
            setName('');
            setLocationName('');
            console.log(location);
          }}
        />
      )}
      <View style={styles.delete}>
        <ButtonDeletePost
          onPress={() => {
            setImageUri(null);
            setName('');
            setLocationName('');
            navigation.navigate('PostsScreen');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  postPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginTop: 32,
    marginBottom: 8,
    alignItems: 'center',
  },
  input: {
    height: 50,
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 24,
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    borderBottomColor: '#E8E8E8',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginBottom: 24,
  },
  delete: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 22,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 24,
    borderBottomColor: '#E8E8E8',
  },
  inputLocation: {
    height: 50,
    // fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  camera: {
    width: '100%',
    height: 240,
    marginTop: 32,
    marginBottom: 8,
  },
  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },

  flipContainer: { alignSelf: 'flex-end' },

  button: { alignSelf: 'center' },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
