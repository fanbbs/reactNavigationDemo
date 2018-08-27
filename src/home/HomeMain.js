import React, {Component} from 'react';

import {View,Text,Button,Image} from 'react-native';


/**
 * 主界面搭建：
 */
export default class HomeMain extends Component{

    constructor(props){
        super(props);
        this.state = {
            mainInfo:'主页',
        }
    }

    
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

    //刷新   state 更新界面
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#ddf',justifyContent:'center'}}>
                <Text style={{alignSelf:'center',fontSize:20,color:'#00f'}}>{this.state.mainInfo}</Text>
            </View>
        );
    }
}