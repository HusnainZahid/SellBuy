import React, {Component} from 'react';
import {View,Text,TextInput,SafeAreaView,StatusBar,Image,TouchableOpacity, StyleSheet} from 'react-native';

import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {AppBtn, AppInput, CModal, Loading, NavHeader} from '../../components'
import { black, primaryColor } from '../../Dimens';

import {uploadProfile,userProfile} from '../../services/Api';
import firebase from '@react-native-firebase/app';

import Icon from 'react-native-vector-icons/Feather';

export class EditProfile extends Component {
    state = {
        fname:'',
        lname:'',
        email:'',
        phone:'',

        img:'',
        data:'',

        detail:'',
        save:'Update',
        
        selectedDate:'Date of Birth',
        isDatePickerVisible:false,

        isLoading:false,

        modalVisible: false,
        txt: '',
        txtplc:'',
        btntxt: '',
        btnPress: null,
        txtInput:'',

        profileList:''
    }


    onUpdated = (profile) => {
        console.log(profile);
        this.manageLoading(false);
        this.setState({
          modalVisible:true,
          txt:'Updated',
          btntxt:'Ok',
          btnPress: () => {
              this.setState({modalVisible: false,save:'Update'}, () => {
              });
            },
      })
        // this.props.navigation.navigate('TabNavigator');
      }


    
    
    componentDidMount() {
        this.subscribeToAuthChanges(this.onAuthStateChanged);
        
        const Data = this.props.route.params.navProps;
        const IMG = Data.image;
        const FName = Data.fname;
        const LName = Data.lname;
        const email = Data.email;
        const phone = Data.phone;
        const Date = Data.Birthday;
        const uid = Data.uid;
        this.setState({detail:Data,img:IMG,fname:FName,lname:LName,email:email, phone:phone,selectedDate:Date, uid:uid})
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
  

    submit = () => {
        this.setState({save:''});
        this.manageLoading(true);
        const values ={
          fname: this.state.fname, 
          lname: this.state.lname, 
          email:this.state.email, 
          phone:this.state.phone, 
          image:this.state.img,
          Birthday:this.state.selectedDate,
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
        } else if(this.state.fname === '' && this.state.lname === '' && this.state.address === '' && this.state.selectedDate === '' ){
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
            const Data = this.props.route.params.navProps;
            values.id = Data.id;
            values.createdAt = Data.createdAt;
            uploadProfile ( values,
              this.onUpdated,{updating:true}
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
            <View style={styles.container}>
              <StatusBar backgroundColor={primaryColor}/>
              <SafeAreaView/>
              <NavHeader title={'Edit Profile'} leftIc={'arrow-back'} leftPressed={()=>{this.props.navigation.navigate('TabNavigator')}}/>
              <KeyboardAwareScrollView contentContainerStyle={{flexGrown:2}}>
              <View style={styles.pickimagecontainer}>
                <View style={styles.imagecontainer}>
                <Image style={styles.image} source={{uri:this.state.img}}/>
                </View>
                <TouchableOpacity onPress={()=>this.showImage()} style={styles.edit}>
                  <Icon name={'edit'} size={20} color={'#000'} />
                </TouchableOpacity>
                <View style={styles.input}>
                  <AppInput
                    value={this.state.fname}
                    icName={'person'}
                    placeholder={'First Name'}
                    onChangeText={(fname) => this.setState({fname})}
                    placeholderTextColor={black}
                    width={'90%'}
                    />
                  <AppInput
                    value={this.state.lname}
                    icName={'person'}
                    placeholder={'Last Name'}
                    onChangeText={(lname) => this.setState({lname})}
                    placeholderTextColor={black}
                    width={'90%'}
                    />
                  <AppInput
                    value={this.state.email}
                    icName={'mail'}
                    placeholder={'Email'}
                    onChangeText={(email) => this.setState({email})}
                    placeholderTextColor={black}
                    width={'90%'}
                      />
                    <AppInput
                      value={this.state.phone}
                      icName={'call'}
                      placeholder={'Contact No'}
                      onChangeText={(phone) => this.setState({phone})}
                      placeholderTextColor={black}
                      width={'90%'}
                    />
                </View>
              <View style={styles.loading}>
              <AppBtn onPress={()=>this.submit()} btntxt={this.state.save} width={'100%'}/>
                <Loading ShowLoading={this.state.isLoading} clr={primaryColor} />
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

const styles = StyleSheet.create({
  container:{
      flex:1,
  },
  pickimagecontainer:{
    height:h('100%'),
    width:'100%',
    alignItems:'center',
    marginTop:h('3%'),
    marginLeft:h('1%')
  },
  imagecontainer:{
    height:h('20%'),
    width:'40%',
    backgroundColor:'#0002',
    borderRadius:h('2%'),
  },
  image:{
    height:h('20%'),
    width:'100%',
    borderRadius:h('2%')
  },
  edit:{
    height:h('5%'),
    width:'35%',
    marginTop:-h('4%'),
    alignItems:'flex-end'
  },
  input:{
    marginRight:h('2%'),
    marginTop:h('5%'),
  },
  loading:{
    height:'6%',
    width:'30%',
    alignItems:'center'
  }
});