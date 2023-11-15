import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { upload } from '../../services/Api';
import ImagePicker from 'react-native-image-picker';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { AppInput, NavHeader,AppBtn, CModal, Loading } from '../../components';
import { black, primaryColor } from '../../Dimens';
import firebase from '@react-native-firebase/app';

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([""]);


export class Sell extends Component {

    state = {
        name:'',
        price:'',
        phone:'',
        subIngredients: [],
        currentSubIngredient:null,

        subIngredient : [],
        productList: [],

        isLoading:false,
        sell:'Sell',

        img: '',
        data:[],

        modalVisible: false,
        txt: '',
        txtplc:'',
        btntxt: '',
        btnPress: null,
        txtInput:'',
        uid:''
    }

    componentDidMount() {
      this.subscribeToAuthChanges(this.onAuthStateChanged)
    }

   subscribeToAuthChanges(authStateChanged) {
      firebase.auth().onAuthStateChanged((user) => {
        console.log (user);
        authStateChanged(user);
      })
    }
    
    onAuthStateChanged = (user) => {
      if (user !== null) {
        // console.log('User uid: ', user.uid);
        const uid = user.uid;
        this.setState({uid:uid})
      }
    }

      onProductAdded = (product) => {
        this.manageLoading(false);
        this.setState(prevState => ({
          productList: [...prevState.productList, product],
          modalVisible:true,
          txt:'Done',
          btntxt:'Ok',
          btnPress: () => {
              this.setState({
                modalVisible: false,
                sell:'Sell',
                img:'',
                name:'',
                price:'',
                phone:''
              }, () => {
              });
            },
      }));
      }    

      submit = () => {
        this.setState({sell:''});
        this.manageLoading(true);
        const values ={
          name: this.state.name, 
          price:this.state.price, 
          imageUri:this.state.img,
          Contact:this.state.phone,
          uid:this.state.uid,
        }
        if(this.state.img === ''){
          this.manageLoading(false);
          this.setState({
            modalVisible:true,
            txt:'Pick Image',
            btntxt:'Ok',
            btnPress: () => {
                this.setState({modalVisible: false,sell:'Sell'}, () => {
                });
              },
        })
        } else if(this.state.name === '' && this.state.price === '' && this.state.phone === ''){
          this.manageLoading(false);
          this.setState({
            modalVisible:true,
            txt:'Enter Name, Price and Contacts No',
            btntxt:'Ok',
            btnPress: () => {
                this.setState({modalVisible: false,sell:'Sell'}, () => {
                });
              },
        })
        } else { 
          upload ( values,
      this.onProductAdded,{updating:false}
      )
    }
      }

          
      showPicker = () => {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      response => {
        if (response.error) {
          console.log("image error");
        } else {
          console.log("Image: " + response.uri)
          this.setState({img: response.uri});
        }
      }
    )
      };
      manageLoading = (value) => {
        this.setState({isLoading: value});
      };    

  render (){
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#1c2e4a'}/>
        <SafeAreaView/>
        <NavHeader title={'Sell'}/>
        <ScrollView>
        <View style={styles.pickimagecontainer}>
          <View style={styles.imagecontainer}>
            <Image style={styles.image} source={{uri: this.state.img}}/>
          </View>
        <AppBtn onPress={()=>this.showPicker()} btntxt={'Pick Image'}width={'40%'}/>
        </View>
        <AppInput
              value={this.state.name}
              icName={'pencil'}
              placeholder={'Name'}
              onChangeText={(text) => this.setState({name:text})}
              placeholderTextColor={black}
              width={'94%'}
              />
          <AppInput
              value={this.state.price}
              icName={'pricetag'}
              placeholder={'Price'}
              onChangeText={(text) => this.setState({price:text})}
              placeholderTextColor={black}
              width={'94%'}
              />
          <AppInput
              value={this.state.phone}
              icName={'call'}
              placeholder={'Contact No'}
              onChangeText={(text) => this.setState({phone:text})}
              placeholderTextColor={black}
              width={'94%'}
              keyboardType={'phone-pad'}
              />
            <View style={styles.btn}>
              <AppBtn onPress={()=>this.submit()} btntxt={this.state.sell} width={'40%'}/>
              <Loading ShowLoading={this.state.isLoading} clr={primaryColor} />
            </View>
     </ScrollView>
     <CModal
      modalVisible={this.state.modalVisible}
      txt={this.state.txt}
      placeholder={''}
      onChangeText={(txtplc) => this.setState({txtplc})}
      btntxt={this.state.btntxt}
      btnPress={this.state.btnPress}
      />
     </View>
    );
 }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  pickimagecontainer:{
    height: h('35%'),
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'
  },
  imagecontainer:{
    height: h('25%'),
    width: '100%',
    backgroundColor: '#0002',
    borderRadius: h('2%'),
    borderWidth: h('0.2%'),
    borderColor: '#0006',
  },
  image:{
    height: h('25%'),
    width: '100%',
    resizeMode: 'cover',
    borderRadius: h('2%'),
    borderWidth: h('0.2%'),
  },
  btn:{
    alignItems:'center'
  }
});