import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { chatStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class PostDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
    
        this.state = {}
    }
    render() {
      return (<Text>This is the PostDetailScreen</Text>)
  }
}