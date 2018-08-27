

#####<font color='#00f'>前言：React-Native 是我们移动开发中经常会接触到的开发语言。因此在发展还比较年轻的ReactNative语言开发中，我们避免不了接触一些第三方库。今天就介绍下博主在 学习ReactNative中碰到的一个使用率比较高的库 ：react-navigation 库。
</font>

本篇文章主要记录下 react-navigation的传值，以及f方法回调。以及用的比较多的 TabNavigator，和StackNavigator 的介绍。

#####1，先上效果图：

(http://github.com/zqHero/reactNavigationDemo/screenShot/asd.png)

![这里写图片描述](https://img-blog.csdn.net/20180827201852383?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTMyMzMwOTc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70) 

</p>
介绍：

#####1，嵌套问题：

	界面主要使用 TabNavigator 和 StackNavigator 之间的嵌套完成: 主界面是一个 StackNavigator 变量。其中嵌套了 TabNavigator Tab导航。 代码如下 RouteView.js：
```


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
```

#####2,跳转和传值问题：

主界面HomeMain.js 导航中有一个跳转按钮，点击跳转到下一页。

跳转方法 以及传参数：
```
 onRightPress(){
        this.props.navigation.navigate('DetailScreen',
        
            //传递给下个界面的参数    
            {
                user:'我是主界面传递的参数',

                //回调函数：
                callBack:(random)=>{
                    alert('主界面数据已经改变')
                    this.setState({
                        mainInfo: '数据已经改变' +':'+ random
                    })
                }
            }
        )
    }
```

详情界面接收方法 以及回调主界面方法：

```

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#ddf',justifyContent:'center',flexDirection:'column'}}>
                <Text style={{alignSelf:'center',fontSize:20,color:'#00f',marginBottom:50}}
                  //接收传过来的参数值
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
```

#####3,navigationOptions 中点击事件的处理：

navigation中 右侧点击事件处理

```
//点击事件的处理：  1，设置参数  bind到当前对象
    componentDidMount(){
        //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，
        //componentDidMount()方法中的子组件在父组件之前执行
        this.props.navigation.setParams({onRightPress:this.onRightPress.bind(this)})
    }

    static navigationOptions =({navigation, screenProps}) =>( {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        // header: () => (<TopHeader/>), // 可以指定自定义的头部导航组件：

        headerTitle:'主页',
        headerRight:(
        <View style={{paddingRight:10}}>
                <Button
                    style={{backgroundColor:'#3dd'}}
                    title={'下一页'}
                    //点击事件的处理：  2，获取方法对象   处理事件
                    onPress={()=>navigation.state.params.onRightPress()}
                />
        </View>),
        tabBarLabel: '主页',
        tabBarIcon: ({ tintColor, focused }) => (
            <Image resizeMode='contain' style={{width:25,height:25}}
                source={require('../imgs/tabbar_homepage.png')}
            />
        )
    })

    /**
     * 点击事件的处理： 3， 处理事件
     */
    onRightPress(){
        this.props.navigation.navigate('DetailScreen',
        
            //传递给下个界面的参数    
            {
                user:'我是主界面传递的参数',

                //回调函数：
                callBack:(random)=>{
                    alert('主界面数据已经改变')
                    this.setState({
                        mainInfo: '数据已经改变' +':'+ random
                    })
                }
            }
        )
    }
```



代码地址：欢迎fork和star：
	https://github.com/zqHero/reactNavigationDemo
