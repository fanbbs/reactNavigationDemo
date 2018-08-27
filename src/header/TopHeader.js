

import React, {Component} from 'react';

import {View,Text,Button} from 'react-native';

/**
 * 自定义  头部导航
 */
export default class TopHeader extends Component{

    render(){
        return (
            <View style={{height:45,backgroundColor:'blue',alignContent:'center',justifyContent:"center"}}>
                <Text style={{alignSelf:'center',fontSize:20,color:'#fff'}}>
                    React-NativgationDemo
                </Text>
            </View>
        )
    }

}