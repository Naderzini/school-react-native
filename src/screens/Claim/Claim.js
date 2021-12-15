import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Header from '../../components/Header/Header';
import LinearGradientButton from '../../components/LinerGradientButton.js/LinearGradientButton';
import styles from './ClaimeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SweetAlert from 'react-native-sweet-alert';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {addClaim} from '../../api'


const ClaimSchema = Yup.object().shape({
  title: Yup.string()
    .required('ce champ est oblogatoire'),
  content: Yup.string()
    .required('ce champ est oblogatoire'),
});
function Claim({navigation}) {
  const [isLoding, setIsLoding] = useState(false);
  const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
  useFormik({
    validationSchema: ClaimSchema,
    initialValues: {title: '', content: '',parent_id:''},
    onSubmit: async (values,onSubmitProps) => {
      setIsLoding(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const parent = await AsyncStorage.getItem('parent');
        const parenId = JSON.parse(parent).id;
        values.parent_id = parenId
       addClaim(values,token)
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              SweetAlert.showAlertWithOptions({
                title: 'Réclamation envoyer',
                subTitle: '',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                otherButtonColor: '#dedede',
                style: 'success',
                cancellable: true,
              });
              setIsLoding(false);
              onSubmitProps.resetForm();
            }
          })
          .catch(error => {
            setIsLoding(false);
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    })

  return (
    <View style={{flex: 1, backgroundColor: '#d3d3d3'}}>
      <View>
        <Header
          name={'Réclamations'}
          backgroundColor={'#a03dcd'}
          iconName={'arrow-back'}
          handelIcon={()=>{navigation.navigate('MyClaims')}}></Header>
      </View>
      <View>
        <View>
          <View style={styles.textAreaContainer}>
            <TextInput
              placeholder="Titre de réclamation"
              onChangeText={handleChange('title')}
              value={values.title}
              onBlur={handleBlur('title')}
            />
              {(touched.title && errors.title ) && <Text style={{color:'red',fontSize:10}}>{errors.title}</Text>}
          </View>
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            placeholder="Votre réclamation"
            numberOfLines={15}
            multiline={true}
            onChangeText={handleChange('content')}
            value={values.content}
            onBlur={handleBlur('content')}
          />
         {(touched.content && errors.content ) && <Text style={{color:'red',fontSize:10}}>{errors.content}</Text>}
        </View>
        {isLoding ? (
          <View style={{marginTop: 80}}>
            <ActivityIndicator size="large" color="#45c3f7" />
          </View>
        ) : (
          <View style={styles.button}>
            <LinearGradientButton
              name={'Envoyer'}
              onPress={handleSubmit}
              nameStyle={[styles.textSign, {color: '#fff', fontSize: 20}]}
              buttonStyle={styles.signIn}
              colors={['#45c3f7', '#074fad']}>
            </LinearGradientButton>
          </View>
        )}
      </View>
    </View>
  );
}
export default Claim;
