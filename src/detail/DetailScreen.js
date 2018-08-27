

import React, {Component} from 'react';

import {View,Text,Button} from 'react-native';

export default class DetailScreen extends Component{

    static navigationOptions =({navigation, screenProps}) =>( { 
         // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        // header: () => (<TopHeader/>), // 可以指定自定义的头部导航组件：

        headerTitle:'详情页', // 导航栏相关设置项
    })

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#ddf',justifyContent:'center',flexDirection:'column'}}>
                <Text style={{alignSelf:'center',fontSize:20,color:'#00f',marginBottom:50}}
                  //接收传过来的参数
                  >
                  {this.props.navigation.state.params.user}    
                </Text>

                <Button 
                    style={{alignSelf:'center',fontSize:20,color:'#fff'}} 
                    title = {'点击回调改变主界面数据'}
                    onPress = {this.props.navigation.state.params.callBack.bind(this,Math.random()*100)}  //回调主界面 callback 方法  改变主界面数据 
                />
            </View>
        )
    }
}