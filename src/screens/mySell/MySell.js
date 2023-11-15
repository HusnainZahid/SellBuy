import React, {Component} from 'react';
import {
  View, 
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
import { userProducts } from '../../services/Api';
import { primaryColor } from '../../Dimens';

import { YellowBox } from "react-native";
import { ProductList } from '../../components/ProductList';
YellowBox.ignoreWarnings([""]);

export class MySell extends Component {

  state = {
    productList: [],
    selectedIndex: 0,
    refreshing: false,
    msg:'Please Wait...',
    isLoading:false
  }

  productsReceived = (productList) => {
      console.log(productList);
      if (productList.length ===  0){
        this.manageLoading(false);
        this.setState({msg:'Not Found'})
      } else {
        this.setState(prevState => ({
          productList: prevState.productList = productList
        }));
    }
  }

  
  productDeleted = () => {
    console.log(this.state.selectedIndex);

    var newProductList = [...this.state.productList];
    newProductList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      productList: prevState.productList = newProductList
    }));

    this.props.navigation.popToTop();
  }


  componentDidMount() {
    this.manageLoading(true);
    userProducts(this.productsReceived);
  }

    refresh = () => {
      this.setState({refreshing: true});
      userProducts(this.productsReceived);
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
        <NavHeader title='My Sell'/>
        {this.state.productList.length > 0 ? (
        <View style={styles.list}>
          <FlatList
              data={this.state.productList}
              renderItem={({item,index}) => <ProductList item={item}
              onPress={() => {
                this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                this.props.navigation.navigate('MySellDetail', { navProps: item, productDeletedCallback: this.productDeleted })
              }}/>}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
            />
        </View>
        ) :     
      <View style={styles.Loading}>
        <Loading ShowLoading={this.state.isLoading} clr={primaryColor} />
          <AppBtn btntxt={this.state.msg} width={'40%'}/>
        </View>
           } 
      </View>
    );
  }
}

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