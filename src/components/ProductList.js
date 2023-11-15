import React, {Component} from 'react';
import {View,StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { primaryColor } from '../Dimens';
import { AppBtn } from './AppBtn';

export class ProductList extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}
            delayPressIn={0}
            style={styles.container}>
                <View style={styles.images}>
                    <Image source={this?.props?.item.image && {uri: this?.props?.item.image}} style={styles.image}/>
                </View>
                <View style={styles.text}>
                    <Text style={styles.heading}>{this?.props?.item.name}</Text>
                </View>
                <View
                style={[styles.text,{marginBottom:h('1%')}]}>
                    <Text style={styles.heading}>Rs: {this?.props?.item.price}</Text>
                </View>
                <TouchableOpacity onPress={this.props.onPress} delayPressIn={0} style={styles.btn}>
                  <AppBtn onPress={this.props.onPress} btntxt={'View Detail'}width={'75%'}/>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:h('40%'),
        backgroundColor:'#fff',
        borderRadius:h('2%'),
        marginBottom:h('1%')
    },
    images:{
        height:h('25%'),
        width:'100%',
    },
    image:{
        height:h('25%'),
        width:'100%',
        borderTopRightRadius:h('2%'),
        borderTopLeftRadius:h('2%')
    },
    text:{
        height:h('4'),
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:17,
        fontWeight:'bold',
        color:primaryColor
    },
    btn:{
        height:h('3'),
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
        
    }
});