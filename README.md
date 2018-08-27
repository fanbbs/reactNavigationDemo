

#####<font color='#00f'>ǰ�ԣ�React-Native �������ƶ������о�����Ӵ����Ŀ������ԡ�����ڷ�չ���Ƚ������ReactNative���Կ����У����Ǳ��ⲻ�˽Ӵ�һЩ�������⡣����ͽ����²����� ѧϰReactNative��������һ��ʹ���ʱȽϸߵĿ� ��react-navigation �⡣
</font>

��ƪ������Ҫ��¼�� react-navigation�Ĵ�ֵ���Լ�f�����ص����Լ��õıȽ϶�� TabNavigator����StackNavigator �Ľ��ܡ�

#####1������Ч��ͼ��

<div align='center'>
![����дͼƬ����](https://img-blog.csdn.net/20180827201852383?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTMyMzMwOTc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70) 

</div >

</p>
���ܣ�

#####1��Ƕ�����⣺

	������Ҫʹ�� TabNavigator �� StackNavigator ֮���Ƕ�����: ��������һ�� StackNavigator ����������Ƕ���� TabNavigator Tab������ �������� RouteView.js��
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
 * ������  
 * 
 * ִ�д���ǰ  ��Ҫ��װ   "react-navigation": "^1.0.0-beta.19" ��: 
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
 * ������ tab:
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
            // navigationOptions: { headerTitle:'niho'}  // �˴�������, �Ḳ������ڵ�`static navigationOptions`����. 
        },
        DetailScreen: { screen: DetailScreen }, //�������
    }
);
```

#####2,��ת�ʹ�ֵ���⣺

������HomeMain.js ��������һ����ת��ť�������ת����һҳ��

��ת���� �Լ���������
```
 onRightPress(){
        this.props.navigation.navigate('DetailScreen',
        
            //���ݸ��¸�����Ĳ���    
            {
                user:'���������洫�ݵĲ���',

                //�ص�������
                callBack:(random)=>{
                    alert('�����������Ѿ��ı�')
                    this.setState({
                        mainInfo: '�����Ѿ��ı�' +':'+ random
                    })
                }
            }
        )
    }
```

���������շ��� �Լ��ص������淽����

```

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#ddf',justifyContent:'center',flexDirection:'column'}}>
                <Text style={{alignSelf:'center',fontSize:20,color:'#00f',marginBottom:50}}
                  //���մ������Ĳ���ֵ
                  >
                  {this.props.navigation.state.params.user}    
                </Text>

                <Button 
                    style={{alignSelf:'center',fontSize:20,color:'#fff'}} 
                    title = {'����ص��ı�����������'}
                    onPress = {this.props.navigation.state.params.callBack.bind(this,Math.random()*100)}  //�ص������� callback ����  �ı����������� 
                />
            </View>
        )
    }
```

#####3,navigationOptions �е���¼��Ĵ���

navigation�� �Ҳ����¼�����

```
//����¼��Ĵ���  1�����ò���  bind����ǰ����
    componentDidMount(){
        //�ڳ�ʼ��render֮��ִֻ��һ�Σ�����������ڣ����Է����κ������
        //componentDidMount()�����е�������ڸ����֮ǰִ��
        this.props.navigation.setParams({onRightPress:this.onRightPress.bind(this)})
    }

    static navigationOptions =({navigation, screenProps}) =>( {  // ��Ļ������Ĭ��ѡ��, Ҳ������������� static navigationOptions ����(�Ḳ�Ǵ˴�������)
        // header: () => (<TopHeader/>), // ����ָ���Զ����ͷ�����������

        headerTitle:'��ҳ',
        headerRight:(
        <View style={{paddingRight:10}}>
                <Button
                    style={{backgroundColor:'#3dd'}}
                    title={'��һҳ'}
                    //����¼��Ĵ���  2����ȡ��������   �����¼�
                    onPress={()=>navigation.state.params.onRightPress()}
                />
        </View>),
        tabBarLabel: '��ҳ',
        tabBarIcon: ({ tintColor, focused }) => (
            <Image resizeMode='contain' style={{width:25,height:25}}
                source={require('../imgs/tabbar_homepage.png')}
            />
        )
    })

    /**
     * ����¼��Ĵ��� 3�� �����¼�
     */
    onRightPress(){
        this.props.navigation.navigate('DetailScreen',
        
            //���ݸ��¸�����Ĳ���    
            {
                user:'���������洫�ݵĲ���',

                //�ص�������
                callBack:(random)=>{
                    alert('�����������Ѿ��ı�')
                    this.setState({
                        mainInfo: '�����Ѿ��ı�' +':'+ random
                    })
                }
            }
        )
    }
```



�����ַ����ӭfork��star��
	https://github.com/zqHero/reactNavigationDemo
