import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAccessToken = async value => {
  try {
    await AsyncStorage.setItem('accessToken', value);
  } catch (error) {
    console.error(error);
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

export const removeAccessToken = async () => {
  try {
    return await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error(error);
  }
};
