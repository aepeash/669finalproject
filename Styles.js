import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export const colors = {
  primary: '#F68444', // orange
  primaryDark: '#F68444', // MD Brown 300
  primaryLight: '#E8EAF6', // MD Amber 200
  outline: '#BDBDBD' // MD Gray 400
}

export const postFeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 20
  },
  postListContainer: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    //width: '100%',
  }
})


export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
    topView: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
      
    },
      logoImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
      },
    middleView: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      
    },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        
      },
     
        inputLabel: {
          flex: 0.3,
          justifyContent: 'flex-end',
          paddingRight: 5,
          textAlign: 'right',
          fontSize: 10
        },
        inputText: {
          flex: 0.7,
          borderColor: colors.outline,
          paddingLeft: 5,
          borderBottomWidth: 0,
          fontSize: 18,
          backgroundColor: '#E8E7E7',
          height: 40,
          width: 130,
          borderRadius: 5
        },
      bottomView: {
        flex: 0.4,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        
      },
        buttonContainer: {
          justifyContent: 'center',
          marginLeft: 8,
          borderWidth: 1,
          borderColor: colors.outline,
          borderRadius: 6,
          backgroundColor: colors.primary,
          width: 148,
          height: 50,
          top: 15,
        
        },
        buttonContainer2: {
          justifyContent: 'space-around',
          marginRight: 8,
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 6,
          backgroundColor: 'white',
          width: 148,
          height: 50,
          top: 15
        },
     
          buttonText: {
            textAlign: 'center',
            color: 'white',
          },
          buttonText2: {

            textAlign: 'center',
            color: colors.primary
          }
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    width: '100%', 
    padding: '5%'
  },
  image: {
    width:320, 
    height:300,
  },
  title: {
    paddingTop:15,
    fontSize: 18, 
    fontWeight: '600',
    color: colors.primary
  },

  descriptions: {
    paddingTop:5,
    fontSize: 14, 
    color: 'gray'
  },

  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'pink'
  },

  header: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary

  },

  search: {
      marginTop:20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      borderRadius: 25,
      borderColor: colors.primary,
      borderWidth: 1,
      marginLeft:20,
      marginRight: 20,
  }

  });

export const peopleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
    peopleListContainer: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      width: '90%',
    },  
      separator: {
        backgroundColor: colors.primaryLight,
        height: 1,
        width: '90%',
        alignSelf: 'center'
      },
      personRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10
      },
        personText: {
          fontSize: 16,
        }
});

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
    messageListContainer: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'stretch',
      width: '100%',
      alignSelf: 'center',
      paddingTop: '3%'
    },
      chatTextSelfContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5, 
        marginRight: 20,
        marginLeft: 40,
        backgroundColor: 'lightblue',
        borderRadius: 6
      },
        chatTextSelf: {
          fontSize: 18,
          textAlign: 'right',
        },
      chatTextOtherContainer: {
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5, 
        marginLeft: 20,
        marginRight: 40,
        backgroundColor: 'lightgray',
        borderRadius: 6
      },
        chatTextOther: {
          fontSize: 18,
          textAlign: 'left',
        },
    inputContainer: {
      flex: 0.1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },  
      inputBox: {
        flex: 0.8,
        borderWidth: 1,
        borderColor: colors.primaryDark,
        borderRadius: 6,
        alignSelf: 'center',
        fontSize: 18,
        height: 40,
        padding: 5,
        margin: 5
      }
});

export const profileStyles = StyleSheet.create({
  topView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  displayName: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20
  },
  myChatsButton: {
    borderWidth: 1,
    borderColor: '#F68444',
    borderRadius: 5,
    padding: 10,
  }

});

export const detailsStyle = StyleSheet.create({
  image: {
    width:320,
    height:300,
    },
  detailsContainer: {
  flex: 1,
  alignItems: 'center',
  width: '100%',
  padding: '5%',
    backgroundColor: 'pink'
  },
  title: {
    paddingTop:15,
    fontSize: 35,
    fontWeight: '600',
    color: colors.primary
  },
  descriptions: {
    padding:5,
    fontSize: 20,
    color: 'gray'
  },
  container: {
      flex: .9,
      backgroundColor: '#A9A9A9',
      width: '80%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingTop: '3%'
    }
});