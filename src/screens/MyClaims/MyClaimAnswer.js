import  React from 'react';
import {View} from 'react-native-animatable';
import {Modal, Portal, Text, Provider, Paragraph} from 'react-native-paper';
import styles from './MyClaimAnswerStyle';

function MyClaimAnswer ( props ) {
  const {onDismiss, visible,myClaim} = props;
  const containerStyle = {backgroundColor: 'white', padding: 10, margin: 20 ,borderRadius:20};
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={containerStyle}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 25, marginRight: 5,fontFamily:'Nunito-Bold'}}>Statut :</Text>
            {myClaim?.item?.statue === 'encour' && (
              <Text style={styles.statueEnCour}>En-cours</Text>
            )}
            {myClaim?.item?.statue === 'resolue' && (
              <Text style={styles.statueResolue}>Résolue</Text>
            )}
            {myClaim?.item?.statue === null && (
              <Text style={styles.statueOuvert}>Ouvert</Text>
            )}
            </View>
          <View> 
            <Text
              style={{
                fontSize: 25,
                marginTop: 5,
                marginRight: 5,
                marginBottom: 10,
                fontFamily:'Nunito-Bold'
              }}>
              Réponse :
            </Text>
            {myClaim?.item?.answer === null?
            <Paragraph style={styles.paragraph}>
              Pas de réponse
            </Paragraph>:
            <Paragraph style={styles.paragraph}>
              {myClaim?.item?.answer}
            </Paragraph>}
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
export default MyClaimAnswer;
