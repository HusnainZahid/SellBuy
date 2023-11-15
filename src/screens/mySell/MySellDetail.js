import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image,SafeAreaView,StatusBar, ImageBackground, StyleSheet} from 'react-native';

import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';
import { AppBtn, CustomModal } from '../../components';
import { NavHeader } from '../../components/NavHeader';
import { white } from '../../Dimens';
import {deleteProduct} from '../../services/Api';


export class MySellDetail extends Component {
    state = {
        modalVisible: false,
        txt: '',
        txtplc:'',
        btntxt: '',
        btntxt1: '',
        btnPress: null,
        btnPress1: null,
        txtInput:'',
    }

    render() {
        const incomingData = this.props.route.params.navProps;

        const ProductDeleted = this.props.route.params.productDeletedCallback;
    
        console.log(incomingData);
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor={'#1c2e4a'}/>
             <SafeAreaView/>   
            <NavHeader title={'Detail'} leftIc={'arrow-back'} leftPressed={()=>{this.props.navigation.navigate('TabNavigator')}}/>
            <Image source={incomingData.image && {uri:incomingData.image}} style={styles.image}/>
            <View style={styles.btn}>
            <AppBtn onPress={()=> {this.props.navigation.navigate('MySellEdit',{product:incomingData})}} btntxt={'Edit'} width={('30%')}/>
            <AppBtn
            onPress={()=>{
            this.setState({
                modalVisible:true,
                txt:'Are You Sure?',
                btntxt:'Yes',
                btntxt1:'No',
                btnPress: () => {
                    deleteProduct(incomingData, ProductDeleted)
                    },
                btnPress1: () => {
                    this.setState({modalVisible: false,signup:'SignUp'}, () => {
                    });
                    },
            })}}
            btntxt={'Delete'} width={('30%')}/>
            </View>
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.bg}>
            <View style={styles.heading}>
            <Text style={styles.title}>Name:</Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{incomingData.name}</Text>
            </View>
            </ImageBackground>
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.bg}>
            <View style={styles.heading}>
                <Text style={styles.title}>Price:</Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{incomingData.price}</Text>
            </View>
            </ImageBackground>
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.bg}>
            <View style={styles.heading}>
                <Text style={styles.title}>Contact:</Text>
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{incomingData.Contact}</Text>
            </View>
            </ImageBackground>
            <CustomModal
                modalVisible={this.state.modalVisible}
                txt={this.state.txt}
                placeholder={''}
                onChangeText={(txtplc) => this.setState({txtplc})}
                btntxt={this.state.btntxt}
                btntxt1={this.state.btntxt1}
                btnPress={this.state.btnPress}
                btnPress1={this.state.btnPress1}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        height:h('30%'),
        width:w('100%'),
    },
    btn:{
        height:h('10%'),
        flexDirection:'row',
        justifyContent:'space-between',
        marginRight:h('2%')
    },
    bg:{
        height:h('6%'),
        width:'100%',
        flexDirection:'row',
        marginTop:h('1%')
    },
    heading:{
        height:h('6%'),
        width:'30%',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        height:h('6%'),
        width:'70%',
        justifyContent:'center'
    },
    title:{
        color:white,
        fontSize:20
    }
});