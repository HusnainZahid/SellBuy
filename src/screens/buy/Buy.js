import React, {Component} from 'react';
import {
  View, 
  ActivityIndicator,
  FlatList,
  StatusBar,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import { AppBtn, Loading, NavHeader } from '../../components';
import { AllProduct } from '../../services/Api';
import { primaryColor } from '../../Dimens';

import { YellowBox } from "react-native";
import { ProductList } from '../../components/ProductList';
YellowBox.ignoreWarnings([""]);

export class Buy extends Component {

  state = {
    productList: [],
    selectedIndex: 0,
    refreshing: false,
    isLoading:false,
  }

  onProductsReceived = (productList) => {
      console.log(productList);
      this.setState(prevState => ({
        productList: prevState.productList = productList
      }));
  }

  componentDidMount() {
    AllProduct(this.onProductsReceived);
  }

    refresh = () => {
      this.setState({refreshing: true});
      AllProduct(this.onProductsReceived);
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
        <NavHeader title='Buy'/>
          <Loading ShowLoading={this.state.isLoading} clr={primaryColor} />
        {this.state.productList.length > 0 ? (
        <View style={styles.list}>
        <FlatList
            data={this.state.productList}
            renderItem={({item,index}) => <ProductList item={item} onPress={()=> {this.props.navigation.navigate('Detail',{navProps:item})}} />}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={() => this.refresh()}
          />
          </View>
          ) :     
          <View style={styles.Loading}>
            <ActivityIndicator color={primaryColor} size={'small'}/>
          <AppBtn btntxt={'Please Wait...'} width={'40%'}/>
          </View>}
      </View>
       );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  list:{
    flex:1,
    margin:h('1%'),
    marginBottom:-h('1%')
  },
  Loading:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
});