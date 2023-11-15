import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';

export class CustomModal extends Component {
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}>
          <View style={styles.container}>
            <ImageBackground
            imageStyle={{borderRadius:h('4%')}}
            source={require('../assets/bg.jpg')}
              style={styles.image}>
            <View style={styles.titleview}>
              <Text style={styles.title}>{this.props.txt}</Text>
            </View>
              <TouchableOpacity
                onPress={this.props.btnPress}
                delayPressIn={0}
                style={styles.btn}>
                <Text style={styles.btntitle}>
                  {this.props.btntxt}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.props.btnPress1}
                delayPressIn={0}
                style={styles.btn1}>
                <Text style={styles.btntitle}>
                  {this.props.btntxt1}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#0004',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height: h('30%'),
    width: w('95%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: h('4%'),
    borderWidth: h('0.2%'),
  },
  titleview:{
    height:h('10%'),
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:h('2%')
  },
  title:{
    color:'#fff',
    fontSize:20
  },
  btn:{
    height: h('6%'),
    width: '30%',
    backgroundColor: '#FBB03B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: h('2%'),
    borderRadius: h('1%'),
  },
  btn1:{
    height: h('6%'),
    width: '30%',
    backgroundColor: '#FBB03B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: h('2%'),
    borderRadius: h('1%'),
  },
  btntitle:{
    color: '#fff',
    fontSize: 20,
  }
})