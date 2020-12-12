import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { detailsStyle, colors, chatStyles } from './Styles';
import { getDataModel } from './DataModel';

export class PostDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
        this.postKey = this.props.route.params.postKey;
        this.post = this.dataModel.getPostForID(this.postKey);
        this.self = this.props.route.params.currentUser;

        this.state = {
          comments: [],
          inputText: ''
        };
    }

    componentDidMount = () => {
      this.subscribeToPost();
    }
  
    componentWillUnmount = () => {
      this.dataModel.unsubscribeFromPost(this.post);
    }
  
    subscribeToPost = async() => {
      console.log('Subscribe to post: ');
      console.log(this.post);
      this.dataModel.subscribeToPost(this.post, this.onPostUpdate);
    }

    onPostUpdate = () => {
      this.setState({comments: this.post.comments});
    }

    onCommentSend = async () => {
      let commentData = {
        text: this.state.inputText,
        timestamp: Date.now(),
        author: this.self,
      }
      await this.dataModel.addPostComment(this.postKey, commentData);
      
      this.setState({
        comments: this.post.comments,
        inputText: ''
      });
    }

    render() {
      console.log(this.state)
      return (
        <View style={detailsStyle.detailsContainer}>
          <Image style={detailsStyle.image} source={{uri: this.post.imageURL}}/>
          <Text style={detailsStyle.title}>{(this.post.title)}</Text>
          <Text style={detailsStyle.descriptions}>{(this.post.description)}</Text>
          <View style={detailsStyle.detailsContainer}>
          <Text style={detailsStyle.comment}>this is a comment </Text>
          </View>
        </View>
      )
  }

}
