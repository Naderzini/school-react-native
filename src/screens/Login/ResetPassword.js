import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from './LoginStyle';
import axios from 'axios';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import InputText from '../../components/TextInput/InputText';
import LinearGradientButton from '../../components/LinerGradientButton.js/LinearGradientButton';
import {BASE_API_URL, LOGIN} from '../../Constant';
import SweetAlert from 'react-native-sweet-alert';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('ce champ est oblogatoire'),
});

const ResetPassword = ({navigation}) => {
  const [isLoding, setIsLoding] = useState(false);
  const [erroMsg,setErrorMsg] =  useState(null);

  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: ResetPasswordSchema ,
      initialValues: {email: ''},
      onSubmit: values => {
        setIsLoding(true);
        axios
        .post(`${BASE_API_URL}parent/reset/password`, values)
        .then(response => {
          console.log(response);
          if(response.status === 200)
            {
              SweetAlert.showAlertWithOptions({
                title: 'Mot de passe changé',
                subTitle: '',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                otherButtonColor: '#dedede',
                style: 'success',
                cancellable: true,
              });
              onSubmitProps.resetForm();
              setIsLoding(false);
            } else
            {
              setErrorMsg("Email invalide")
            }
        })
        .catch(error => {
          setIsLoding(false);
        });
    },
    });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eb8153" barStyle="light-content" />
      <View style={styles.header}>
      <Image
           style={{borderRadius: 200,marginBottom:50,marginLeft:75,width:200,height:200}}
           source={require('../../assets/img/logo.png')}
          ></Image>
      </View>
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
            {!erroMsg && erroMsg}
        </View>
       
        {isLoding === false ? (
          <View style={styles.button}>
            <LinearGradientButton
              name={'Envoyer'}
              onPress={handleSubmit}
              nameStyle={[styles.textSign, {color: '#fff'}]}
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

export default ResetPassword;
