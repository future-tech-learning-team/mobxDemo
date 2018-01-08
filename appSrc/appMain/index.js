
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Root from './router';
import StoreComponent from './storeComponent';

class TodoList extends StoreComponent {
    render(){
        return(
            <View style={styles.container}>
                <Root.myStackRouter/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default TodoList;