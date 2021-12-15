import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ChangePasswordModalStyle';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {UPDATE_PASSWORD, BASE_API_URL} from '../../Constant';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {changePassword} from '../../api';

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'minimum 6 caracters')
    .required('ce champ est oblogatoire'),
  password1: Yup.string()
    .min(6, 'minimum 6 caracters')
    .required('ce champ est oblogatoire'),
});

function ChangePasswordModal(props) {
  const {onDismiss, visible} = props;
  const [isLoding, setIsLoding] = useState(false);
  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
    useFormik({
      validationSchema: ChangePasswordSchema,
      initialValues: {password: '', password1: ''},
      onSubmit: async (values, onSubmitProps) => {
        setIsLoding(true);
        try {
          const token = await AsyncStorage.getItem('token');
          const parent = await AsyncStorage.getItem('parent');
          const parent_id = JSON.parse(parent).id;
          changePassword(parent_id, values, token)
            .then(response => {
              console.log(response);
              if (response.status === 200) {
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
              }
            })
            .catch(error => {
              console.log(error);
              setIsLoding(false);
            });
        } catch (error) {
          console.log(error);
        }
      },
    });

  const containerStyle = {
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
    borderRadius: 20,
  };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={containerStyle}>
          <View>
            <View>
              <Text style={{marginTop: 15, marginBottom: 5}}>
                Nouveau mot de passe
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 20,
                }}
                placeholder="Nouveau mot de passe"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={handleBlur('password')}
                error={errors.password}
                touched={touched.password}
              />
              {touched.password && errors.password && (
                <Text style={{color: 'red', fontSize: 10}}>
                  {errors.password}
                </Text>
              )}
              <Text style={{marginTop: 15, marginBottom: 5}}>
                Confirmé le mot de passe
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  borderRadius: 20,
                }}
                placeholder="Confirmé le mot de passe"
                secureTextEntry={true}
                onChangeText={handleChange('password1')}
                value={values.password1}
                onBlur={handleBlur('password1')}
              />
              {touched.password1 && errors.password1 && (
                <Text style={{color: 'red', fontSize: 10}}>
                  {errors.password1}
                </Text>
              )}
              {!errors.password1 && values.password !== values.password1 && (
                <Text style={{color: 'red', fontSize: 10}}>
                  les mots de passe ne sont pas confirmes
                </Text>
              )}
              {isLoding === false ? (
                <View style={styles.button}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                      colors={['#ec8052', '#ff4c41']}
                      style={styles.signIn}>
                      <Text style={styles.textSign}>Enregister</Text>
                      <MaterialIcons
                        name="navigate-next"
                        color="#fff"
                        size={20}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{marginTop: 80}}>
                  <ActivityIndicator size="large" color="#ec8052" />
                </View>
              )}
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}
export default ChangePasswordModal;
