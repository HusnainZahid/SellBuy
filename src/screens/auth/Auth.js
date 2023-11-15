import React, {Component} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Alert,
    TouchableOpacity, 
    Image,
    Animated,
    Easing,
    LogBox,
    StatusBar,
    StyleSheet
} from 'react-native';

import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
var validator = require("email-validator");

import {AppBtn, AppInput, CModal, Loading} from '../../components'
import {white, black, primaryColor,} from '../../Dimens';
import LogoImage from '../../assets/SB.jpg';
import firebase from '@react-native-firebase/app';

export class Auth extends Component {
    state = {
        email:'',
        password:'',
        confirmPass:'',
        isLoading:false,
        signin:'SignIn',
        signup:'SignUp',

        user:true,
        selected:true,

        sellAnim: new Animated.Value(0),
        itAnim: new Animated.Value(0),

        animFinished:false,
        logoImage: new Animated.Value(0),
        inputForm: new Animated.Value(0),

        modalVisible: false,
        txt: '',
        txtplc:'',
        btntxt: '',
        btnPress: null,
        txtInput:'',

    }

    componentDidMount(){
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        Animated.sequence([
            Animated.timing(this.state.sellAnim,{
                toValue:1,
                duration:1000,
                easing:Easing.easeOutCubic
            }), 
            Animated.timing(this.state.itAnim,{
                toValue:1,
                duration:500,
                easing:Easing.easeOutCubic
            })
        ]).start()

        if(!this.state.animFinished){
            Animated.parallel([
                Animated.timing(this.state.logoImage,{
                    toValue:1,
                    duration:1000
                }),
                Animated.timing(this.state.inputForm,{
                    toValue:1,
                    duration:1500
                })
            ]).start(
                this.setState({animFinished:true})
            )
        }
        this.subscribeToAuthChanges(this.onAuthStateChanged)

    }

    subscribeToAuthChanges(authStateChanged) {
        firebase.auth().onAuthStateChanged((user) => {
          authStateChanged(user);
        })
      }
      
    
      onAuthStateChanged = (user) => {
        if (user !== null) {
          this.props.navigation.navigate('TabNavigator');
        }
      }
    


    signInValidation = () => {
        this.manageLoading(true);
        this.setState({signin:''})
        const valid = validator.validate(this.state.email); // true
        if(this.state.email === '' || this.state.password === '' ){
            this.manageLoading(false);
            this.setState({
                modalVisible:true,
                txt:'Enter Email and Password',
                btntxt:'Ok',
                btnPress: () => {
                    this.setState({modalVisible: false,signin:'SignIn'}, () => {
                    });
                  },
            })
    
        } else if (!valid) {
            this.manageLoading(false);
            this.setState({
                modalVisible:true,
                txt:'Provide Valid Email',
                btntxt:'Ok',
                btnPress: () => {
                    this.setState({modalVisible: false,signin:'SignIn'}, () => {
                    });
                  },
            })
    } else {
        this.manageLoading(true);
            const values = {email:this.state.email,password:this.state.password}
            this.signIn(values)
    }
    }

    signIn({ email, password }) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((value) => {
          console.log(value);
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            this.manageLoading(false);
            // console.warn('That email address is invalid!');
            this.setState({
                modalVisible:true,
                txt:'Invalid User, Please SignIn',
                btntxt:'Ok',
                btnPress: () => {
                    this.setState({modalVisible: false,signin:'SignIn'}, () => {
                    });
                  },
            })

          }      
        });
      }

    signUpValidation = () => {
        this.manageLoading(true);
        this.setState({signup:''})
        const valid = validator.validate(this.state.email); // true
        if(this.state.email === '' && this.state.password === '' && this.state.confirmPass === ''){
            this.manageLoading(false);
            this.setState({
                modalVisible:true,
                txt:'Enter Email and Password',
                btntxt:'Ok',
                btnPress: () => {
                    this.setState({modalVisible: false,signup:'SignUp'}, () => {
                    });
                  },
            }) 
        } else if (!valid) {
            this.manageLoading(false);
            this.setState({
                modalVisible:true,
                txt:'Provide Valid Email',
                btntxt:'Ok',
                btnPress: () => {
                    this.setState({modalVisible: false,signup:'SignUp'}, () => {
                    });
                  },
            })
        } else if (this.state.password !== this.state.confirmPass) {
            this.manageLoading(false);
            this.setState({
                modalVisible:true,
                txt:'Password and ConfirmPassword must match',
                btntxt:'Ok',
                btnPress: () => {
                    this.setState({modalVisible: false,signup:'SignUp'}, () => {
                    });
                  },
            })
    
        }
         else {
            this.manageLoading(true);
            const values = {email:this.state.email,password:this.state.password}
            this.Signup(values)
        }
    }

    Signup({ email, password, displayName }) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((value) => {
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.manageLoading(false);
          this.setState({
              modalVisible:true,
              txt:'That email address is already in use',
              btntxt:'Ok',
              btnPress: () => {
                  this.setState({modalVisible: false,signup:'SignUp'}, () => {
                  });
                },
          })

        }
      });
    }

    manageLoading = (value) => {
        this.setState({isLoading: value});
      };
    
    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{flexGrown:2}}>
            <View style={styles.main}>
            <StatusBar backgroundColor={primaryColor}/>
            <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.image}>
            <Animated.View style={{opacity:this.state.logoImage}}>
                <Image style={{borderRadius:h('2%')}} source={LogoImage} resizeMode={'contain'}/>
            </Animated.View>                        
                <View style={{flexDirection:'row'}}>
                <Animated.View style={{
                    opacity: this.state.sellAnim,
                    top: this.state.sellAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[100,0]
                    })}}>
                    <Text style={{fontSize: 30,color:white}}>Sell</Text>
                    </Animated.View>
                    <Animated.View style={{
                        opacity:this.state.itAnim
                    }}>
                        <Text style={{fontSize: 30,color:'#00ADA9'}}>Buy</Text>
                    </Animated.View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.bottom}></View>
                {this.state.user ? (
                <View style={[styles.card,{paddingBottom:h('6%')}]}>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={()=> this.setState({user:true})} delayPressIn={0}>
                        <Text style={[styles.headingtitle,{fontWeight:'bold'}]}>SignIn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({user:false})} delayPressIn={0}>
                        <Text style={{fontSize:20}}>SignUp</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginTop:-h('5%')}}>
                    <Animated.View
                    style={{
                        opacity:this.state.inputForm,
                        top: this.state.inputForm.interpolate({
                            inputRange:[0,1],
                            outputRange:[100,30]
                        })}}>
                    <AppInput
                        icName={'person'}
                        placeholder={'Enter Email'}
                        onChangeText={(email)=>this.setState({email})}
                        placeholderTextColor={black}
                        width={('93%')}
                        />
                    <AppInput
                        icName={'key'}
                        placeholder={'Enter Password'}
                        onChangeText={(password)=>this.setState({password})}
                        placeholderTextColor={black}
                        secureTextEntry
                        width={('93%')}
                        />
                    <View>
                    <AppBtn
                        onPress={()=>this.signInValidation()}
                        btntxt={this.state.signin}
                        width={('93%')}
                        />
                    <Loading ShowLoading={this.state.isLoading} clr={white} />
                    </View>
                    </Animated.View>
                    </View>
                </View>
                ):                 
                <View style={[styles.card,{paddingBottom:h('2%')}]}>
                <View style={styles.heading}>
                    <TouchableOpacity
                        onPress={()=> this.setState({user:false})}
                        delayPressIn={0}>
                        <Text style={{fontSize:25,fontWeight:'bold'}}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.setState({user:true})}
                        delayPressIn={0}>
                        <Text style={{fontSize:20}}>SignIn</Text>
                    </TouchableOpacity>
                    </View>
                   <AppInput
                        icName={'person'}
                        placeholder={'Enter Email'}
                        onChangeText={(email)=>this.setState({email})}
                        placeholderTextColor={black}
                        width={('93%')}
                        />
                    <AppInput
                        icName={'key'}
                        placeholder={'Enter Password'}
                        onChangeText={(password)=>this.setState({password})}
                        placeholderTextColor={black}
                        secureTextEntry
                        width={('93%')}
                        />
                    <AppInput
                        icName={'key'}
                        placeholder={'Confirm Password'}
                        onChangeText={(confirmPass)=>this.setState({confirmPass})}
                        placeholderTextColor={black}
                        secureTextEntry
                        width={('93%')}
                        />
                    <View>
                    <AppBtn
                        onPress={()=>this.signUpValidation()}
                        btntxt={this.state.signup}
                        width={('93%')}
                        />
                    <Loading ShowLoading={this.state.isLoading} clr={white} />
                    </View>
                </View> }
                <CModal
                modalVisible={this.state.modalVisible}
                txt={this.state.txt}
                placeholder={''}
                onChangeText={(txtplc) => this.setState({txtplc})}
                btntxt={this.state.btntxt}
                btnPress={this.state.btnPress}
                />
            </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main:{
        flex:1,
    },
    container:{
        height:h('40%'),
        width:'100%'
    },
    image:{
        height:h('40%'),
        alignItems:'center',
        justifyContent:'center'
    },
    bottom:{
        height:h('60%'),
        backgroundColor:white
    },
    card:{
        width:'93%',
        backgroundColor:white,
        marginTop:-h('68%'),
        marginLeft:h('2%'),
        borderWidth:h('.2%'),
        borderRadius:h('2%'),
    },
    heading:{
        height:h('6%'),
        flexDirection:'row',
        justifyContent:'space-between',
        margin:h('2%')
    },
    headingtitle:{
        fontSize:30
    }
})