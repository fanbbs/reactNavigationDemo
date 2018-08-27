

import React, {Component} from 'react';

import {View,Text,Button,Image} from 'react-native';
import { YellowBox } from 'react-native';

/**
 * 主界面搭建：
 */
export default class HomeNearBy extends Component{
    
    static navigationOptions =({navigation, screenProps}) =>( {  
        headerTitle:'附近', // 导航栏相关设置项
        tabBarLabel: '附近',
        tabBarIcon: ({ tintColor, focused }) => (
            <Image resizeMode='contain' style={{width:25,height:25}}
                source={require('../imgs/tabbar_discover.png')}
            />
        )
    })

    render(){
        return (
            <View style={{flex:1,backgroundColor:'#ddf',justifyContent:'center'}}>
                <Text style={{alignSelf:'center',fontSize:20,color:'#00f'}}>附近</Text>
            </View>
        );
    }
}