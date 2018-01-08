/**
 * Created by shiyunjie on 2018/1/2.
 */
import React from 'react';
import {
    Platform,
    BackHandler,
    Alert
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import TodoList from './todoList';
import TodoDetail from './todoDetail';

class Router {
    myStackRouter = StackNavigator({
        TodoList: { screen: TodoList },
        TodoDetail: { screen: TodoDetail },

    }, {
        headerMode: 'screen',
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }),
        navigationOptions: (navigation) => (
            {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
                gesturesEnabled: false, //禁止右滑返回，右滑返回后导致界面不响应
            }
        )
    });

    constructor() {
        // 初始状态
        if (Platform.OS === 'android') {
            this.hardwareBackPress = BackHandler.addEventListener('hardwareBackPress', this.androidBackAction);
        }
    }

    androidBackAction() {
        Alert.alert('提示', '是否退出软件',
            [
                {
                    text: '退出', onPress: () => {
                    BackHandler.exitApp();
                }
                },
                { text: '否' }
            ]);
        return true;
    }
}
const router = new Router();
export default router;