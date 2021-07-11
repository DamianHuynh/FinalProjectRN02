import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../../apis/userLoginApi';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email không được bỏ trống')
    .email('Email không hợp lệ'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password không được bỏ trống'),
});

const setAccessToken = async value => {
  try {
    await AsyncStorage.setItem('accessToken', value);
  } catch (error) {
    console.log(error);
  }
};

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

const LoginScreen = () => {
  const handleSubmitFormik = values => {
    userLogin(values)
      .then(res => {
        if (res.data.statusCode === 200) {
          console.log('handleSubmitFormik', res.data.content.accessToken);
          setAccessToken(res.data.content.accessToken);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginForm}>
        <Text>Login Form</Text>
        <Formik
          validationSchema={loginSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={handleSubmitFormik}>
          {({values, handleSubmit, handleChange, errors}) => (
            <>
              <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput
                  style={[styles.inputField, errors.email && styles.inputError]}
                  onChangeText={handleChange('email')}
                  placeholder="example@email.co"
                  value={values.email}
                />

                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text>Password</Text>
                <TextInput
                  style={[
                    styles.inputField,
                    errors.password && styles.inputError,
                  ]}
                  placeholder="******"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSubmit}>
                <Text>Sign in</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity
          onPress={async () => {
            await getAccessToken();
          }}>
          <Text>Get accessToken</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputField: {
    borderWidth: 1,
    padding: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  signInButton: {
    backgroundColor: '#bffefe',
    padding: 8,
    width: '30%',
    alignItems: 'center',
  },
});

export default LoginScreen;
