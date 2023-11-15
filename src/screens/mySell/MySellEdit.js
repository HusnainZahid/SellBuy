import React, {Component} from 'react';
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

import { AppInput, NavHeader,AppBtn, CModal, Loading } from '../../components';
import { black, primaryColor } from '../../Dimens';

import ImagePicker from 'react-native-image-picker';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { upload } from '../../services/Api';

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([""]);


export class MySellEdit extends Component {

    state = { 
       detail:'',

        img: '', 
        name:'',
        price:'',
        phone:'',
        uid:'',

        isLoading:false,
        sell:'Sell',


        modalVisible: false,
        txt: '',
        txtplc:'',
        btntxt: '',
        btnPress: null,
        txtInput:'',
    }

    componentDidMount() {
      const incomingData = this.props.route.params.product;
      const IMG = incomingData.image;
      const Name = incomingData.name;
      const Price = incomingData.price;
      const phone = incomingData.Contact;
      const uid = incomingData.uid;
      this.setState({detail:incomingData,img:IMG,name:Name,price:Price,phone:phone,uid:uid})
    }

    onUpdated = (product) => {
        console.log(product);
        this.manageLoading(false);
        this.setState({
          modalVisible:true,
          txt:'Updated',
          btntxt:'Ok',
          btnPress: () => {
              this.setState({modalVisible: false,sell:'Sell'}, () => {
              });
            },
      })
        // this.props.navigation.navigate('TabNavigator');
      }


      submit = () => {
        this.setState({sell:''});
        this.manageLoading(true);
        const values ={
          name: this.state.name, 
          price:this.state.price, 
          image:this.state.img,
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
          const incomingData = this.props.route.params.product;
          values.id = incomingData.id;
          values.createdAt = incomingData.createdAt;
          upload ( values,
            this.onUpdated,{updating:true}
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
          this.setState({detail: response.uri});
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
      <StatusBar backgroundColor={primaryColor}/>
      <SafeAreaView/>
      <NavHeader title={'Detail'} leftIc={'arrow-back'} leftPressed={()=>{this.props.navigation.navigate('MySellDetail')}}/>
      <ScrollView>
      <View style={styles.pickimagecontainer}>
        <View style={styles.imagecontainer}>
          <Image style={styles.image} source={{uri:this.state.img }}/>
        </View>
        <AppBtn onPress={()=>this.showPicker()} btntxt={'Pick Image'} width={'40%'}/>
      </View>
      <AppInput
        value={this.state.name}
          icName={'person'}
          placeholder={'Name'}
          onChangeText={text => this.setState({name:text})}
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
        onChangeText={text => this.setState({phone:text})}
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