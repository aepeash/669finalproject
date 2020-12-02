import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { postFeedStyles } from './Styles';
import { getDataModel } from './DataModel';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
        this.self = this.props.route.params.currentUser;

        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
      // Executed the first time the component is mounted
      this.subscribeToPosts();
    }

    componentWillUnmount = () => {
      // Executed before the component is unmounted
      // Unsubscribes me from post updates
      this.dataModel.unsubscribeFromPosts(this.posts);
    }

    subscribeToPosts = async() => {
      // Calls the dataModel.subscribeToPosts method and creates a listener for new posts, post updates
      this.dataModel.subscribeToPosts(this.onPostUpdate);
    }

    onPostUpdate = (posts) => {
      posts = posts.reverse();
      this.setState({posts: posts}); // On each update, use setState to update the state
    }

    render() {
        return (
        <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', alignContent: 'flex-start', width: '100%'}}
        behavior={"height"}
        keyboardVerticalOffset={100}>
        <View style={postFeedStyles.postListContainer}>
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
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostDetail', {'postKey': item.key})}>
                <View style={{flex: 1, alignItems: 'center', width: '100%', padding: '5%'}}>
                    <Image style={{width:225, height:300}} source={{uri: item.imageURL}}/>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.description}</Text>
                </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
        )
    }
}
