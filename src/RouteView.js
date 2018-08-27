

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Image} from 'react-native';

import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'

import TopHeader from './header/TopHeader'

import HomeMain from './home/HomeMain'
import HomeNearBy from '././home/HomeNearBy'
import HomeMy from '././home/HomeMy'

import DetailScreen from './detail/DetailScreen'

import { YellowBox } from 'react-native';

/**
 * 主界面  
 * 
 * 执行代码前  需要安装   "react-navigation": "^1.0.0-beta.19" 库: 
 * npm install react-navigation
 */
export default class RouteView extends Component{
    
    constructor(props){
        super(props)

        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    }

    render(){
        return <App />
    }  
}

/**
 * 主界面 tab:
 */
const Home = TabNavigator({
    HomeMain: {
        screen:HomeMain,
    },
    HomeNearBy: {
        screen: HomeNearBy,
    },
    HomeMy: {
        screen: HomeMy,
    }},
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: false,
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
        },
    }
)

//
const App = StackNavigator({
        Home:{
            screen:Home,
            // navigationOptions: { headerTitle:'niho'}  // 此处设置了, 会覆盖组件内的`static navigationOptions`设置. 
        },
        DetailScreen: { screen: DetailScreen }, //详情界面
    }
);

