import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList, 
    StatusBar, 
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { AppBtn, Loading, NavHeader } from '../../components';
import { userProfile } from '../../services/Api';
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h,
  } from 'react-native-responsive-screen';
import { primaryColor, white } from '../../Dimens';

export class ShowProfile extends Component {

    
  state = {
    profileList: null,
    selectedIndex: 0,
    refreshing: false,
    msg:'Please Wait...',
    isLoading:false,
    press:''
  }

  onProfileReceived = (profileList) => {
      console.log(profileList);
      if(profileList.length === 0){
          this.manageLoading(false);
          this.setState({msg:'Add Profile',press:()=> this.props.navigation.navigate('Profile')})
      } else {
      this.setState({
        profileList: profileList[0]
      });
    }
  }

  componentDidMount() {
    this.manageLoading(true);      
    userProfile(this.onProfileReceived);
    }

    refresh = () => {
        this.setState({refreshing: true});
        userProfile(this.onProfileReceived);
        setTimeout(() => {
        this.setState({refreshing: false}, () => {
            console.warn('All done');
        });
        }, 3000);
    };

    manageLoading = (value) => {
        this.setState({isLoading: value});
        };  
    
    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor={'#1c2e4a'}/>
            <SafeAreaView/>
            <NavHeader title='My Profile'/>
            <View style={styles.imagecontainer}>
            <Image source={this?.state?.profileList?.image && {uri: this?.state?.profileList?.image}} style={styles.image}/>
            </View>
            <View style={styles.name}>
                <Text style={styles.title}>{this?.state?.profileList?.fname} </Text>
                <Text style={styles.title}>{this?.state?.profileList?.lname}</Text>
            </View>
            <View style={styles.heading}>
                <Text style={{fontSize:17,color:'blue'}}>{this?.state?.profileList?.email}</Text>
            </View>
            <View style={styles.heading}>
                <Text style={{fontSize:17,color:'blue'}}>{this?.state?.profileList?.phone}</Text>
            </View>
            <TouchableOpacity onPress={()=> {this.props.navigation.navigate('EditProfile',{navProps:this?.state?.profileList})}} delayPressIn={0}
            style={styles.btn}>
            <AppBtn onPress={()=> {this.props.navigation.navigate('EditProfile',{navProps:this?.state?.profileList})}} btntxt={'Edit'} width={'30%'}/>
            </TouchableOpacity>
            </View>
        );
        }
    }
    
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    imagecontainer:{
        height:h('20%'),
        width:'40%',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:h("2%")
    },
    image:{
        height:h('20%'),
        width:'100%',
        borderRadius:h('3%')
    },
    name:{
        height:h('8%'),
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:'blue'
    },
    heading:{
        height:h('4'),
        width:'100%',
        justifyContent:'center',
        marginBottom:h('1%'),
        alignItems:'center'                    
    },
    btn:{
        height:h('6'),
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    }
});