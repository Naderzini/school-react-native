import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  flatListItem: {
    // flexDirection: 'row',
    padding: 7,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3,
  },
  iconEvent: {
    width: 60,
    height: 60,
    marginTop: 0,
    marginRight: 5,
    borderRadius: 30,
  },
  labelEvent: {
    fontSize: 25,
    marginLeft: 10,
    color: '#000',
    fontFamily:'Nunito-Bold'
  },
  nameEvent: {
    // marginTop:7,
    fontSize: 22,
    marginLeft: 20,
    color: '#000',
    fontFamily:'Nunito-Regular'
  },
  addClaimButton: {
    borderWidth: 1,
    borderColor: '#0a5fb6',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#0a5fb6',
    borderRadius: 100,
    marginBottom: 30,
    marginRight: 20,
  },
  button: {
    marginTop: 15,
    height: 50,
    justifyContent: "center",
    
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 3,
    
  },
  textBtnStyle: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
 //   fontWeight: 'bold',
    
}
});
