import { StyleSheet } from 'react-native';
export default StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
      },
      list: {
        paddingHorizontal: 17,
      },
      footer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#d3d3d3',
        paddingHorizontal: 10,
        padding: 5,
      },
      btnSend: {
        backgroundColor: '#0084ff',
        width: 40,
        height: 40,
        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconSend: {
        width: 25,
        height: 25,
        alignSelf: 'center',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#fff',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
      },
      inputs: {
        height: 40,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
      },
      balloon: {
        maxWidth: 250,
        padding: 4,
        borderRadius: 10,
      },
      itemIn: {
        alignSelf: 'flex-start',
      },
      itemOut: {
        alignSelf: 'flex-end',
        backgroundColor: '#0084ff',
        color: '#fff',
      },
      time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize: 10,
        color: '#000',
      },
      item: {
        marginVertical: 2,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        borderRadius: 15,
        padding: 5,
      },
    });
    