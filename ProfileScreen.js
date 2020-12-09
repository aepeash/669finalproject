import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { chatStyles, colors } from './Styles';
import { getDataModel } from './DataModel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { profileStyles } from './Styles';

export class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
        this.self = this.props.route.params.currentUser;
        console.log("this.self on Profile Screen: ", this.self);

    
        
    }
    render() {
      return ( 
        <View style={profileStyles.topView}>
            <FontAwesome name="user-circle-o" 
                          size={70} 
                          color={'#F68444'} />
            <Text style={profileStyles.displayName}>{this.self.displayName}</Text>
            <TouchableOpacity style={profileStyles.myChatsButton}
                onPress={()=>this.props.navigation.navigate('People', {currentUser: this.self})}>
                <Text>My Chats</Text>
                
            </TouchableOpacity>
        </View>
      )
    }
  

  componentDidMount = () => {
  }

}