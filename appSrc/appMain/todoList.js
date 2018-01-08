/**
 * Created by shiyunjie on 2018/1/2.
 */


import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ObserverComponent from './observerComponent';


class TodoList extends ObserverComponent {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'TodoList',
    });

    constructor() {
        super();
        this.state = {
            isRefresh: false,
        }
    }

    handleRenderItem = (e) => {
        return (
            <View>
                <View style={styles.item} >
                    <View style={styles.itemTextContainer} >
                        <Text style={styles.itemText} >
                            {`第${e.index + 1}项: todo_${e.item.index}`}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity onPress={() => {
                            this.rootStore.currentTodo = e.index;
                            this.props.navigation.navigate(
                                'TodoDetail',
                                { title: `TodoDetail${ e.index + 1 }` }
                            );
                        }} >
                            <Text style={styles.itemText} >
                                修改
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity onPress={() => {
                            this.rootStore.removeTodoListItem(e.index);
                        }} >
                            <Text style={styles.itemText} >
                                删除
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    style={{ flex: 1 }}
                    defaultValue={`${e.index}`}
                />
            </View>
        )
    };

    handleKeyExtractor = (item, index) => `${index}`;

    handleAddTodo = () => {
        this.rootStore.addTodoListItem();
    };

    onRefresh = () => {
        this.setState({ isRefresh: true });
        setTimeout(() => this.setState({ isRefresh: false }), 3000);
    };

    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.rootStore.todoList.slice()}
                    renderItem={this.handleRenderItem}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    keyExtractor={this.handleKeyExtractor}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.isRefresh}
                />
                <TouchableOpacity onPress={this.handleAddTodo} >
                    <View style={styles.button} >
                        <Text style={styles.buttonText} >添加</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    item: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#C9C9C9',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemText: {
        fontSize: 20,
        textAlign: 'left',
    },
    itemTextContainer: {
        flex: 4,
    },
    itemSeparator: {
        height: 5,
        backgroundColor: '#F5FCFF',
    },
    button: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
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