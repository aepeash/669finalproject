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
        this.postKey = this.props.route.params.postKey;
        let post = this.dataModel.getPostForID(this.postKey);
        this.state = {post: post};
        
    }
    render() {
      console.log(this.state)
      return (<Text>This is the PostDetailScreen for post {JSON.stringify(this.state.post.title)}</Text>)
  }

  componentDidMount = () => {
  }

}