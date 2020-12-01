import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { chatStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        console.log('I was triggered by the constructor');

        this.dataModel = getDataModel();
        this.self = this.props.route.params.currentUser;

        this.state = {

        };
    }

    render() {
        console.log('I was triggered during render on HomeScreen');
        console.log(this.state);
        console.log('----------------');
        return (
        <KeyboardAvoidingView 
        style={chatStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={100}>
        <View>
          <FlatList
            data={this.state.posts}
            ref={(ref) => {this.flatListRef = ref}}
            onContentSizeChange={() => {
              if (this.flatListRef) {
                this.flatListRef.scrollToEnd();
              }
            }}
            renderItem={({item})=>{
              return (
                <View style={item.author === this.self ? 
                  chatStyles.chatTextSelfContainer :
                  chatStyles.chatTextOtherContainer
                }>
                    <Text>{item.description}</Text>
                </View>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
        )
    }
}
