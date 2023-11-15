import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image,SafeAreaView,StatusBar, ImageBackground,Linking, Platform, StyleSheet} from 'react-native';

import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';
import { NavHeader } from '../../components/NavHeader';
import { white } from '../../Dimens';
import Icon from 'react-native-vector-icons/Ionicons';

export class Detail extends Component {
    state = {
        detail:'',
    }
   
    componentDidMount = () => {
        const incomingData = this.props.route.params.navProps;
        this.setState({detail:incomingData})
    }

    openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${this.state.detail.Contact}`)
        } else {
            Linking.openURL(`telprompt:${this.state.detail.Contact}`)
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor={'#1c2e4a'}/>
            <SafeAreaView/>   
            <NavHeader title={'Detail'} leftIc={'arrow-back'} leftPressed={()=>{this.props.navigation.navigate('TabNavigator')}}/>
            <Image source={this.state.detail.image && {uri:this.state.detail.image}} style={styles.image}/>
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.imagebg}>
            <View style={styles.heading}>
                <Text style={styles.title}>Name: </Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{this.state.detail.name}</Text>
            </View>
            </ImageBackground>
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.bg}>
            <View style={styles.heading}>
                <Text style={styles.title}>Price: </Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{this.state.detail.price}</Text>         
            </View>
            </ImageBackground>
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.bg}>
            <TouchableOpacity onPress={()=> {this.openDial();}} delayPressIn={0} style={styles.btn}>
            <View style={styles.icon}>
                <Icon name={'call'} size={25} color={white} />
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{this.state.detail.Contact}</Text>
            </View>
            </TouchableOpacity>
            </ImageBackground>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
    },
    image:{
        height:h('30%'),
        width:w('100%'),
    },
    imagebg:{
        height:h('6%'),
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:h('5%')
    },
    heading:{
        height:h('6%'),
        width:'30%',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        height:h('6%'),
        width:'70%',
        justifyContent:'center',
    },
    bg:{
        height:h('6%'),
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:h('1%')
    },
    btn:{
        height:h('6%'),
        width:'100%',
        flexDirection:'row',
        borderRadius:h('2%')
    },
    icon:{
        height:h('6%'),
        width:'10%',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:h('1%')
    },
    title:{
        color:white,
        fontSize:20
    }
});