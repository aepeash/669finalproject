import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { detailsStyle, colors, chatStyles } from './Styles';
import { getDataModel, savePost } from './DataModel';
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

export class PostDetailScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
        this.postKey = this.props.route.params.postKey;
        this.post = this.dataModel.getPostForID(this.postKey);
        this.self = this.props.route.params.currentUser;
        console.log("~~~~~~~~~~~~~ postDetailScreen~~~~~~~~~~~");
        console.log("this.self: ", this.self);
        console.log("this.post: ", this.post);

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
      // console.log('Subscribe to post: ', this.post);
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
      return (
        <View style={detailsStyle.detailsContainer}>
          <Image style={detailsStyle.image} source={{uri: this.post.imageURL}}/>
          <Text style={detailsStyle.title}>{(this.post.title)}</Text>
          <Text style={detailsStyle.descriptions}>{(this.post.description)}</Text>
          <View style={detailsStyle.heartContainer}>
            <AntDesign name="hearto" 
                              size={24} 
                              color={'#F68444'}
                              onPress={()=>this.dataModel.savePost(this.state.post, this.self.key)} />
            <Text> Add this to your list!</Text>
          </View>
          <View style={detailsStyle.detailsContainer}>
            <Text style={detailsStyle.comment}>this is a comment </Text>
          </View>
        </View>
      )
  }

}
