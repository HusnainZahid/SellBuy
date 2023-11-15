import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';

import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {AppBtn, AppInput, CModal, Loading, NavHeader} from '../../components'
import { black, primaryColor, white } from '../../Dimens';

import {uploadProfile,userProfile} from '../../services/Api';
import firebase from '@react-native-firebase/app';

import Icon from 'react-native-vector-icons/Feather';

export class Profile extends Component {
    state = {
        fname:'',
        lname:'',
        email:'',
        phone:'',

        img:'',
        data:'',
        save:'Save',
        
        selectedDate:'Date of Birth',
        isDatePickerVisible:false,

        modalVisible: false,
        txt: '',
        txtplc:'',
        btntxt: '',
        btnPress: null,
        txtInput:'',

        productList:''
    }

    onProfileReceived = (productList) => {
        console.log('Product',productList);
    //     this.setState({
            // productList: productList
    // });
    }

    
    
    componentDidMount() {
        this.subscribeToAuthChanges(this.onAuthStateChanged);
        
        userProfile(this.onProfileReceived);
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
  
        onProfileAdded = (product) => {
          this.manageLoading(false);
          this.setState(prevState => ({
            productList: [...prevState.productList, product],
            modalVisible:true,
                      txt:'Done',
                      btntxt:'Ok',
                      btnPress: () => {
                          this.setState({modalVisible: false,save:'Save'}, () => {
                          });
                        },
        }));
        }    
  

    submit = () => {
        this.setState({save:''});
        this.manageLoading(true);
        const values ={
          fname: this.state.fname, 
          lname: this.state.lname, 
          email:this.state.email, 
          phone:this.state.phone, 
          imageUri1:this.state.img,
          Birthday:this.state.selectedDate,
          uid:this.state.uid,
        }
        if(this.state.fname === '' && this.state.lname === ''){
          this.manageLoading(false);
          this.setState({
            modalVisible:true,
            txt:'Enter First and Last Name',
            btntxt:'Ok',
            btnPress: () => {
                this.setState({modalVisible: false,save:'Save'}, () => {
                });
              },
        })
        } else { 
            uploadProfile ( values,
      this.onProfileAdded,{updating:false}
      )
    }
      }

    showImage = () => {
        
// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
   
  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  ImagePicker.showImagePicker( {
      title: 'Pick an Image', maxHeight:600,
      maxWidth:800
  }, response => {
    if (response.error) {
      console.log('Image Error');
    } else {
    //   const source = { uri: response.uri };
   
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
   
      console.log("Image: " + response.uri)
      this.setState({img: response.uri, data: response.data});
    }
  }
)
    }

    manageLoading = (value) => {
      this.setState({isLoading: value});
    };  

    render() {
        return (
            <View
            style={{
                flex:1
            }}
            >
                <StatusBar backgroundColor={primaryColor}/>
                <SafeAreaView/>
                <NavHeader
                title={'Add Profile'}
                leftIc={'arrow-back'}
                leftPressed={()=>{this.props.navigation.navigate('TabNavigator')}}
                />
                <KeyboardAwareScrollView contentContainerStyle={{flexGrown:2}}>
                <View 
                style={{
                    height:h('100%'),
                    width:'100%',
                    // backgroundColor:'#ada',
                    alignItems:'center',
                    marginTop:h('3%'),
                    marginLeft:h('1%')
                }}>
                    <View
                    style={{
                        height:h('20%'),
                        width:'40%',
                        backgroundColor:'#0002',
                        borderRadius:h('2%'),
                    }}
                    >
                        <Image 
                     style={{
                        height:h('20%'),
                        width:'100%',
                        borderRadius:h('2%')
                    }}
                        source={{uri:this.state.img}}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={()=>this.showImage()}
                        style={{
                          height:h('5%'),
                          width:'35%',
                          marginTop:-h('5%'),
                          alignItems:'flex-end'
                        }}>
                        <Icon name={'edit'} size={20} color={'#000'} />
                        </TouchableOpacity>
                        <View
                        style={{
                            marginRight:h('2%'),
                            marginTop:h('5%'),
                        }}
                        >
                    <AppInput
                    value={this.state.productList.fname}
                        icName={'person'}
                        placeholder={'First Name'}
                        onChangeText={(fname) => this.setState({fname})}
                        placeholderTextColor={black}
                        width={'90%'}
                            />
                    <AppInput
                        icName={'person'}
                        placeholder={'Last Name'}
                        onChangeText={(lname) => this.setState({lname})}
                        placeholderTextColor={black}
                        width={'90%'}
                            />
                    <AppInput
                        icName={'mail'}
                        placeholder={'Email'}
                        onChangeText={(email) => this.setState({email})}
                        placeholderTextColor={black}
                        width={'90%'}
                            />
                    <AppInput
                        icName={'call'}
                        placeholder={'Contact No'}
                        onChangeText={(phone) => this.setState({phone})}
                        placeholderTextColor={black}
                        width={'90%'}
                            />
                        </View>
              <View
            style={{
              height:h('6%'),
              width:'30%',
              alignItems:'center',
            }}
            >
              <AppBtn
              onPress={()=>this.submit()}
              btntxt={this.state.save}
              width={'100%'}
              />
               <Loading ShowLoading={this.state.isLoading} crl={white} />
                    </View>
                </View>
                <CModal
                modalVisible={this.state.modalVisible}
                txt={this.state.txt}
                placeholder={''}
                onChangeText={(txtplc) => this.setState({txtplc})}
                btntxt={this.state.btntxt}
                btnPress={this.state.btnPress}
                />
                </KeyboardAwareScrollView>
            </View>
        );
    }
};