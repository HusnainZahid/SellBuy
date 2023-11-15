import React, {Component} from 'react';
import {View, Image, StatusBar, StyleSheet} from 'react-native';
import firebase from '@react-native-firebase/app';

export class Splash extends Component {
  componentDidMount = () => {
    setTimeout(() => {
        this.subscribeToAuthChanges(this.onAuthStateChanged)
    }, 2000);
  };


  subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      console.log (user);
      authStateChanged(user);
    })
  }
  

  onAuthStateChanged = (user) => {
    if (user !== null) {
        this.props.navigation.replace('TabNavigator');
    } else {
      this.props.navigation.replace('Auth');
    }
  }


  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor={'#fff'}/>
          <Image source={require('../../assets/SB.jpg')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
})