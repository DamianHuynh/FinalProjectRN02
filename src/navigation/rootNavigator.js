import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, SignupScreen, HomeScreen} from '../screens';
import {getAccessToken} from '../utils/storage';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../redux/selectors/loginSelector';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = useSelector(getAccessTokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const setAccessTokenToRedux = async () => {
      const accessTokenStorage = await getAccessToken();
      if (accessTokenStorage) {
        console.log(accessTokenStorage);
        dispatch({type: 'SET_ACCESS_TOKEN', payload: accessTokenStorage});
      }
    };
    setAccessTokenToRedux();
  }, []);

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

  console.log(isLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLogin ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
