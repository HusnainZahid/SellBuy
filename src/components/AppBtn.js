import React, {Component} from 'react';
import {TouchableOpacity,Text,ImageBackground,StyleSheet} from 'react-native';
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
} from 'react-native-responsive-screen';  
import { white } from '../Dimens';

export class AppBtn extends Component {
    render() {
        return (
            <TouchableOpacity
            {...this.props}
            style={[styles.container,{width:this.props.width}]}>
                <ImageBackground
                source={require('../assets/bg.jpg')}
                style={styles.image}>
                <Text style={styles.title}>{this.props.btntxt}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:h('6%'),
        alignItems:'center',
        justifyContent:'center',
        marginLeft:h('2%'),
        marginTop:h('1%')
    },
    image:{
        flex:1,
        height:h('6%'),
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        borderRadius:h('2%')
    },
    title:{
        color:white,
        fontSize:22
    }
})