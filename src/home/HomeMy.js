

import React, {Component} from 'react';

import {View,Text,Button,Image} from 'react-native';
import { YellowBox } from 'react-native';

/**
 * 主界面搭建：
 */
export default class HomeMy extends Component{

    static navigationOptions =({navigation, screenProps}) =>( {  
        headerTitle:'我的', // 导航栏相关设置项
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => (
            <Image resizeMode='contain' style={{width:25,height:25}}
                source={require('../imgs/tabbar_mine.png')}
            />
        )
    })
    
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#ddf',justifyContent:'center'}}>
                <Text style={{alignSelf:'center',fontSize:20,color:'#00f'}}>我的</Text>
            </View>
        );
    }
}