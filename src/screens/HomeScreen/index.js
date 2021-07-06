import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {removeAccessToken} from '../../utils/storage';
import {getAccessTokenSelector} from '../../redux/selectors/loginSelector';
export default function HomeScreen() {
  const a = useSelector(getAccessTokenSelector);
  console.log(a);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await removeAccessToken(null);
    dispatch({type: 'LOGOUT'});
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <MapView
        style={{height: '100%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 10.771663,
          longitude: 106.669631,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          title="Khải Sneaker"
          coordinate={{latitude: 10.771663, longitude: 106.669631}}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({});
