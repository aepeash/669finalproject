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
            posts: [
                {
                    key: '1',
                    author: {
                        key: 'Yf2XubR8GkQ1VFn9hH33',
                        displayName: 'Alannah',
                        email: 'a@a.com',
                    },
                    
                    title: 'Alannah\'s First Post',
                    description: 'Hey all you cool cats and kittens, this is my first project description.',
                    timestamp: 'November 25, 2020 at 12:00:00 AM UTC-5'
                },

                {
                    key: '2',
                    author: {
                        key: '5ZqfNfaCoysNix7E9IV5',
                        displayName: 'Alannah',
                        email: 'a@a.com',
                    },

                    title: 'Alannah\'s second Post',
                    description: 'This is my description for a project.',
                    timestamp: 'November 30, 2020 at 12:00:00 AM UTC-5'
                },

                {
                    key: '3',
                    author: {
                        key: '5ZqfNfaCoysNix7E9IV5',
                        displayName: 'Alannah',
                        email: 'a@a.com',
                    },

                    title: 'Alannah\'s third Post',
                    description: 'This is my second post description.',
                    timestamp: 'December 1, 2020 at 12:00:00 AM UTC-5'
                },

                {
                    key: '4',
                    author: {
                        key: 'Yf2XubR8GkQ1VFn9hH33',
                        displayName: 'Alannah',
                        email: 'a@a.com',
                    },

                    title: 'Alannah\'s fourth Post',
                    description: 'I was too lazy to fill out a description lmao.',
                    timestamp: 'December 2, 2020 at 12:00:00 AM UTC-5'
                },

                {
                    key: '5',
                    author: {
                        key: '5ZqfNfaCoysNix7E9IV5',
                        displayName: 'Alannah',
                        email: 'a@a.com',
                    },

                    title: 'Alannah\'s fifth Post',
                    description: 'Happy birthday to me :)',
                    timestamp: 'December 1, 2020 at 12:00:00 AM UTC-5'
                },
            ]
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
