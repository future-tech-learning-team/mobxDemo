/**
 * Created by shiyunjie on 2018/1/3.
 */

import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ObserverComponent from './observerComponent';

class TodoDetail extends ObserverComponent {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return ({
            headerTitle: title,
        });
    };

    render() {
        const item = this.rootStore.getCurrentTodo;
        return (
            <View style={styles.container} >
                <Text style={styles.text} >{`todo_ ${item.index}`}</Text>
                <TouchableOpacity onPress={() => {
                    this.rootStore.editCurrentTodo('addition');
                }} >
                    <Text style={styles.text} >增加</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.rootStore.editCurrentTodo('subtraction');
                }} >
                    <Text style={styles.text} >减少</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => {
                    for (let i = 0 ; i < 4 ; i++) {
                        this.rootStore.setTimeoutTodo('addition');
                    }
                }}
                >
                    <Text style={styles.text} >测试 setTimeout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    item: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C9C9C9',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default TodoDetail;