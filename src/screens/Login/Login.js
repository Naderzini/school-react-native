import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './LoginStyle';
import axios from 'axios';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import InputText from '../../components/TextInput/InputText';
import LinearGradientButton from '../../components/LinerGradientButton.js/LinearGradientButton';
import {BASE_API_URL, LOGIN} from '../../Constant';
import ResetPasswordModal from './ResetPassword';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('ce champ est oblogatoire'),
  password: Yup.string()
    .min(6, 'minimum 6 caracters')
    .required('ce champ est oblogatoire'),
});

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [isLoding, setIsLoding] = useState(false);
  const [token, setToken] = useState('');
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
 
  const handleShowPassord = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {email: '', password: ''},
      onSubmit: values => {
        setIsLoding(true);
        axios
          .post(`${BASE_API_URL}${LOGIN}`, values)
          .then(response => {
            if (response.data.token === null) {
              setIsLoding(false);
              setToken(response.data.token);
            } else {
              AsyncStorage.setItem('token', response.data.token);
              AsyncStorage.setItem(
                'parent',
                JSON.stringify(response.data.parent),
              );
              setIsLoding(false);
              navigation.navigate('DrawerNavigation');
            }
          })
          .catch(error => {
            console.log(error);
            setIsLoding(false);
          });
      },
    });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eb8153" barStyle="light-content" />
      <View style={styles.header}></View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <InputText
            placeholder={'Email'}
            placeholderTextColor={'#666666'}
            autoCapitalize={'none'}
            style={styles.textInput}
            onChangeText={handleChange('email')}
            value={values.email}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}></InputText>
        </View>
        <Text style={[styles.text_footer, {marginTop: 20,fontFamily: 'Nunito-Regular'}]}>Mot de passe</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" size={20} />
          <InputText
            placeholder={'mot de passe'}
            placeholderTextColor={'#666666'}
            autoCapitalize={'none'}
            style={styles.textInput}
            secureTextEntry={showPassword}
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
          />
          <TouchableOpacity onPress={handleShowPassord}>
            {showPassword ? (
              <Feather name="eye-off" color="gray" size={20} />
            ) : (
              <Feather name="eye" color="gray" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {token === null && (
          <View>
            <Text style={{color: 'red', marginTop: 5}}>
              Email ou mot de passe incorrect
            </Text>
          </View>
        )}
        <TouchableOpacity
         onPress={() => {
          navigation.navigate('ResetPassword')
        }}>
           <Text style={styles.textForgetPassword}>Mot de passe oublié</Text>
          </TouchableOpacity>
        {isLoding === false ? (
          <View style={styles.button}>
            <LinearGradientButton
              name={'Connecter'}
              onPress={handleSubmit}
              nameStyle={[styles.textSign, {color: '#fff',fontFamily: 'Nunito-Regular'}]}
              buttonStyle={styles.signIn}
              colors={['#ec8052', '#ff4c41']}></LinearGradientButton>
          </View>
        ) : (
          <View style={{marginTop: 30}}>
            <ActivityIndicator size="large" color="#ec8052" />
          </View>
        )}
      </Animatable.View>
    </View>
  );
};

export default Login;
