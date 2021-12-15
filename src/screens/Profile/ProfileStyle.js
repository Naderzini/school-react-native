import { StyleSheet } from 'react-native';
export default StyleSheet.create({

    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color: '#000',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },
      menuSettigsItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderWidth: 2,
        margin: 5,
        borderRadius: 10,
      },
      button: {
        marginTop: 100,
        height: 50,
        justifyContent: "center",
            backgroundColor: "#c6c6c6",
            shadowOpacity: 0.25,
            shadowRadius: 2.84,
            elevation: 3,
            marginHorizontal:20,
            borderRadius:10,
            height:60
      },
 })