import React from 'react';
import { TextInput, Text, View, Image,
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { postFeedStyles } from './Styles';
import { getDataModel } from './DataModel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { homeStyles } from './Styles';
import { FontAwesome } from '@expo/vector-icons'; 

const thePosts = [
  {
      key: '1',
      author: {
          key: 'Yf2XubR8GkQ1VFn9hH33',
          displayName: 'Alannah',
          email: 'a@a.com',
      },
      imageURL: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2272&q=80',
      title: 'Clay Flower vase',
      description: 'Clay project: Beautiful flower vase with a cool shape',
      timestamp: 'November 25, 2020 at 12:00:00 AM UTC-5'
  },

  {
      key: '2',
      author: {
          key: '5ZqfNfaCoysNix7E9IV5',
          displayName: 'Alannah',
          email: 'a@a.com',
      },

      imageURL: 'https://images.unsplash.com/photo-1544376936-e15fd353d311?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      title: 'Floral ornament for Christmas',
      description: 'DIY project: Fake leaves and flowers to make a beatiful ornament for the door',
      timestamp: 'November 30, 2020 at 12:00:00 AM UTC-5'
  },

  {
      key: '3',
      author: {
          key: '5ZqfNfaCoysNix7E9IV5',
          displayName: 'Alannah',
          email: 'a@a.com',
      },

      imageURL: 'https://images.unsplash.com/photo-1544967919-44c1ef2f9e7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80',
      title: 'Toodler benie',
      description: 'Crochet Project: Toodler benie with modern design',
      timestamp: 'December 1, 2020 at 12:00:00 AM UTC-5'
  },

  {
      key: '4',
      author: {
          key: 'Yf2XubR8GkQ1VFn9hH33',
          displayName: 'Alannah',
          email: 'a@a.com',
      },

      imageURL: 'https://images.unsplash.com/photo-1594577983669-af1f34dd5d7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
      title: 'Stay Home Floral embroidery',
      description: 'Embroidery Project: Super advanced and cool embroidery piece. Stay home!',
      timestamp: 'December 2, 2020 at 12:00:00 AM UTC-5'
  },

  {
      key: '5',
      author: {
          key: '5ZqfNfaCoysNix7E9IV5',
          displayName: 'Alannah',
          email: 'a@a.com',
      },

      imageURL: 'https://images.unsplash.com/photo-1602615008780-dd606777215a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      title: 'A painting with golden things',
      description: 'Craft project: Adding gold pieces to you cool, minimalistic painting',
      timestamp: 'December 1, 2020 at 12:00:00 AM UTC-5'
  },
];

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.dataModel = getDataModel();
        this.self = this.props.route.params.currentUser;
        console.log("this.self on HomeScreen: ", this.self);

        this.state = {
          query: '',
          posts: thePosts,
          filtered: thePosts,
            
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

    handleSearch = text => {
      const formattedQuery = text.toLowerCase()
      const data = this.state.posts.filter( post => {
        return this.contains(post.title, formattedQuery)
      })
      this.setState({ filtered: data, query: text })
    }

    contains = (title, query) => {
      if (title.toLowerCase().includes(query)) {
        return true
      }
      return false
    }

    renderHeader = () => (
      <View style={homeStyles.search}>

        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.handleSearch}
          status='info'
          placeholder='Search'
          style={{
            borderRadius: 25,
            borderColor: '#333',
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
            textAlign: "center",
        
          }}
          textStyle={{ color: '#000' }}
        />
      </View>
    )

    render() {
        return (
        <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', alignContent: 'flex-start', width: '100%'}}
        behavior={"height"}
        keyboardVerticalOffset={100}>
          <View style={homeStyles.headerContainer}>
            <Text style={homeStyles.header}>All posts</Text>
            <FontAwesome name="user-circle-o" 
                          size={24} 
                          color={'#F68444'}
                          onPress={()=>this.props.navigation.navigate('Profile', {currentUser: this.self})} />
          </View>
        <View style={postFeedStyles.postListContainer}>
          <FlatList 
            ListHeaderComponent={this.renderHeader}
            data={this.state.filtered}
            ref={(ref) => {this.flatListRef = ref}}
            // onContentSizeChange={() => {
            //   if (this.flatListRef) {
            //     this.flatListRef.scrollToTop();
            //   }
            // }}
            renderItem={({item})=>{
              return (
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostDetail', {'postKey': item.key})}>
                <View style={homeStyles.container}>
                 
                    <Image style={homeStyles.image} source={{uri: item.imageURL}}/>
                    <Text style={homeStyles.title}>{item.title}</Text>
                    <Text style={homeStyles.descriptions}>{item.description}</Text>
                    
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
