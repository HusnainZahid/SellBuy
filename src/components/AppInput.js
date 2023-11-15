import React, {Component} from 'react';
import {View,TextInput,StyleSheet} from 'react-native';
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { black } from '../Dimens';

export class AppInput extends Component {
    render() {
        return (
            <View style={[styles.container,{width:this.props.width}]}>
                <View style={styles.icon}>
                     <Icon name={this.props.icName} size={25} color={black} />
                </View>
                <View style={styles.input}>
                    <TextInput
                        {...this.props}
                        style={{
                            paddingLeft:h('1%')
                        }}
                        />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:h('6%'),
        backgroundColor:'#0002',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:h('2%'),
        marginBottom:h('1%'),
        borderRadius:h('2%')
    },
    icon:{
        height:h('6%'),
        width:'12%',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    input:{
        height:h('6%'),
        width:'90%',
        justifyContent:'center',
    }
});