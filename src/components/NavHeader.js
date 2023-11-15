import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ImageBackground,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {white, primaryColor} from '../Dimens';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

export class NavHeader extends Component {
  render() {
    return (
      <ImageBackground
      source={require('../assets/bg.jpg')}
        style={styles.image}>
        <TouchableOpacity
          onPress={this.props.leftPressed}
          style={styles.left}
          delayPressIn={0}>
          <Icon name={this.props.leftIc} color={white} size={h('3.5%')} />
        </TouchableOpacity>
        <View
          style={styles.titleview}>
          <Text
            style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.props.rightPressed}
          style={styles.right}
          delayPressIn={0}>
          <Icon name={this.props.rightIc} color={white} size={h('3.5%')} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    height: h('6%'),
    width: '100%',
    backgroundColor: primaryColor,
    flexDirection: 'row',
  },
  left:{
    height: h('6%'),
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleview:{
    height: h('6%'),
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    color: white,
    fontSize: h('3%'),
  },
  right:{
    height: h('6%'),
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})