import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

export class Loading extends Component {
    render() {
        return (
            <View>
                {this.props.ShowLoading ? (
                <View style={styles.container}>
                    <ActivityIndicator color={this.props.clr} size={'small'}/>
                </View>
                ):null}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:-h('6%')
    }
})