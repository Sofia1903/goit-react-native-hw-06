import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  const location = route.params ? route.params.location : null;
  console.log(location);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          // latitude: 37.78825,
          // longitude: -122.4324,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log('Map is ready')}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          description="Hello"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
