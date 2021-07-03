import React from 'react';
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
import {userSignUp} from '../../apis/userLoginApi';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email không được bỏ trống')
    .email('Email không hợp lệ'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password không được bỏ trống'),
  name: Yup.string().required('Tên không được bỏ trống'),
});

const SignupScreen = () => {
  const handleSubmitFormik = values => {
    const data = {...values, gender: true, phone: '0982167222'};
    userSignUp(data)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginForm}>
        <Text>Login Form</Text>
        <Formik
          validationSchema={loginSchema}
          initialValues={{email: '', password: '', name: ''}}
          onSubmit={handleSubmitFormik}>
          {({values, handleSubmit, handleChange, errors}) => (
            <>
              <View style={styles.inputContainer}>
                <Text>Name</Text>
                <TextInput
                  style={[styles.inputField, errors.name && styles.inputError]}
                  onChangeText={handleChange('name')}
                  placeholder="username"
                  value={values.name}
                />

                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
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
                <Text>Sign up</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
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

export default SignupScreen;
