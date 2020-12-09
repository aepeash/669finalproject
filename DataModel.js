import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';
import { useCallback } from 'react';

class DataModel {
  constructor() {
    if (firebase.apps.length === 0) { // aka !firebase.apps.length
      firebase.initializeApp(firebaseConfig);
    }
    this.usersRef = firebase.firestore().collection('users');
    this.chatsRef = firebase.firestore().collection('chats');
    this.postsRef = firebase.firestore().collection('posts');
    this.storageRef = firebase.storage().ref();
    this.users = [];
    this.chats = [];
    this.posts = [];
    this.chatListeners = [];
    this.asyncInit();
  }

  asyncInit = async () => {
    await this.loadUsers();
    await this.loadChats();
    await this.loadPosts();
    //this.subscribeToChats();
  }

  loadPosts = async () => {
    let querySnap = await this.postsRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data;
      data.key = key;
      this.posts.push(data);
    })
  }

  loadUsers = async () => {
    let querySnap = await this.usersRef.get();
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.users.push(data);
    });
  }

  getUsers = () => {
    return this.users;
  }

  createUser = async (email, pass, dispName) => {
    // assemble the data structure
    let newUser = {
      email: email,
      password: pass,
      displayName: dispName
    }

    // add the data to Firebase (user collection)
    let newUserDocRef = await this.usersRef.add(newUser);

    // get the new Firebase ID and save it as the local "key"
    let key = newUserDocRef.id;
    newUser.key = key;
    this.users.push(newUser);
    return newUser;
  }

  getUserForID = (id) => {
    for (let user of this.users) {
      if (user.key === id) {
        return user;
      }
    }
    // will return undefined. No haiku this time...
  }

  getPostForID = (id) => {
    for (let post of this.posts) {
      if (post.key === id) {
        return post;
      }
    }
  }

  loadChats = async () => {
    let querySnap = await this.chatsRef.get();
    querySnap.forEach(async qDocSnap => {
      let data = qDocSnap.data();
      let thisChat = {
        key: qDocSnap.id,
        participants: [],
        messages: []
      }
      for (let userID of data.participants) {
        let user = this.getUserForID(userID);
        thisChat.participants.push(user);
      }

      let messageRef = qDocSnap.ref.collection("messages");
      let messagesQSnap = await messageRef.get();
      messagesQSnap.forEach(qDocSnap => {
        let messageData = qDocSnap.data();
        messageData.author = this.getUserForID(messageData.author);
        messageData.key = qDocSnap.id;
        thisChat.messages.push(messageData);
      });
      this.chats.push(thisChat);
    });
  }

  subscribeToChat = (chat, notifyOnUpdate) => {
    this.chatSnapshotUnsub = this.chatsRef.doc(chat.key)
        .collection('messages')
        .orderBy('timestamp')
        .onSnapshot((querySnap) => {
          chat.messages = [];
          querySnap.forEach((qDocSnap) => {
            let messageObj = qDocSnap.data();
            messageObj.key = qDocSnap.id;
            messageObj.author = this.getUserForID(messageObj.author);
            chat.messages.push(messageObj);
          });
          notifyOnUpdate(); // call back to the subscriber
        });
  }

  subscribeToPosts = (notifyOnUpdate) => {
    this.postSnapshotUnsub = this.postsRef
        .orderBy('timestamp')
        .onSnapshot((querySnap) => {
          this.posts = [];
          querySnap.forEach((qDocSnap) => {
            let postObj = qDocSnap.data();
            postObj.key = qDocSnap.id;
            postObj.author = this.getUserForID(postObj.author);
            this.posts.push(postObj);
          });
          notifyOnUpdate(this.posts);
        });
  }

  unsubscribeFromChat = (chat) => {
    // don't really need 'chat' but could need it in the future
    if (this.chatSnapshotUnsub) {
      this.chatSnapshotUnsub();
    }
  }

  unsubscribeFromPosts = () => {
    if (this.postSnapshotUnsub) {
      this.postSnapshotUnsub();
    }
  }

  addChatListener = (listener, chatID) => {
    this.subscribeToChat(chatID);
    this.chatListeners.push({
      listener: listener,
      chatID: chatID
    });
  }

  notifyChatListeners = (_chatID) => {
    this.chatListeners.forEach(({listener, chatID}) => {
      if (chatID === _chatID) {
        listener.onChatUpdate();
      }
    });
  }

  getOrCreateChat = async (user1, user2) => {

    // look for this chat in the existing data model 'chats' array
    // if it's here, we know it's already in Firebase
    for (let chat of this.chats) {
      // we need to use user keys to look for a match
      // and we need to check for each user in each position
      if (( chat.participants[0].key === user1.key &&
          chat.participants[1].key === user2.key) ||
          ( chat.participants[0].key === user2.key &&
              chat.participants[1].key === user1.key)){
        return chat; // if found, return it and we're done
      }
    }

    // chat not found, gotta create it. Create an object for the FB doc
    let newChatDocData = { participants: [user1.key, user2.key] };
    // add it to firebase
    let newChatDocRef = await this.chatsRef.add(newChatDocData);
    // create a local chat object with full-fledged user objects (not just keys)
    let newChat = {
      participants: [user1, user2],
      key: newChatDocRef.id, // use the Firebase ID
      messages: []
    }
    // add it to the data model's chats, then return it
    this.chats.push(newChat);
    return newChat;
  }

  getChatForID = (id) => {
    for (let chat of this.chats) {
      if (chat.key === id) {
        return chat;
      }
    }
    // the chat was not found
    // should throw an error prob'ly
    // return undefined
    // [[almost accidental haiku]]
  }

  addChatMessage = async (chatID, message) => { // doesn't need to be async?

    let messagesRef = this.chatsRef.doc(chatID).collection('messages');

    let fbMessageObject = {
      type: 'text',
      text: message.text,
      timestamp: message.timestamp,
      author: message.author.key,
    }
    console.log("fbMessageObject: ", fbMessageObject);

    messagesRef.add(fbMessageObject); // onSnapshot will update local model
  }

  addChatImage = async (chat, author, imageObject) => {
    console.log('... and here we would add the image ...');
    console.log(imageObject);

    // handleTakePicture():
    // let picData = await this.camera.takePictureAsync();
    // this.dataModel.addChatImage(this.chat, this.currentUser, picData);

    // my attempt
    let messagesRef = this.chatsRef.doc(chat.key).collection('messages');
    console.log("chat.key: ", chat.key);


    // Set up storage refs and download URL
    let fileName = '' + Date.now();
    let imageRef = this.storageRef.child(fileName);
    // console.log("imageRef: ", imageRef);

    // fetch the image object from the local filesystem
    let response = await fetch(imageObject.uri);
    let imageBlob = await response.blob();
    console.log("imageBlob: ", imageBlob);


    // then upload it to Firebase Storage
    await imageRef.put(imageBlob);

    // ... and update the current image Document in Firestore
    let downloadURL = await imageRef.getDownloadURL();


    let fbImageObject = {
      height: imageObject.height,
      width: imageObject.width,
      imageURL: downloadURL,
      timestamp: Date.now()
    }
    //usually uri
    console.log("fbImageObject: ", fbImageObject);


    // let imageDocSnap = await this.messagesRef.get();
    // let finalImage = imageDocSnap.data();


    messagesRef.add(fbImageObject);


    // await messagesRef.set(fbImageObject);

    // this.addChatMessage(chat.key, fbImageObject);


  }

}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}