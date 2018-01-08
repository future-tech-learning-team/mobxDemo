/**
 * Created by shiyunjie on 2018/1/2.
 */
import { observable, action, runInAction, computed } from 'mobx';

class RootStore {
    constructor() {
        this.routerKeys = {};
    }

    @observable todoList = [
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
        { index: 5 },
        { index: 6 },
        { index: 7 },
        { index: 8 },
        { index: 9 },
        { index: 10 },
    ];

    @observable currentTodo = null;

    @observable photo = {
        url: '',
        name: '',
    };

    @computed get getPhotoPath() {
        return `${this.photo.url}/${this.photo.name}`;
    }

    @computed get hasUrl() {
        return !!this.photo.url;
    }

    @computed get hasTodoList() {
        return this.todoList.length > 0;
    }

    @computed get getCurrentTodo() {
        return this.currentTodo !== null ? this.todoList[this.currentTodo] : null
    }


    @action addTodoListItem() {
        let item = this.todoList.length > 0 ?
            { index: this.todoList[this.todoList.length - 1].index + 1 } :
            { index: 1 };
        this.todoList.push(item);
    }


    @action removeTodoListItem(index) {
        if (index >= 0 && index < this.todoList.length) {
            this.todoList.splice(index, 1);
        }
    }

    @action editCurrentTodo(flag) {
        if (this.currentTodo === null) {
            return;
        }

        let list = [];
        this.todoList.forEach((item) => {
            list.push(item);
        });

        if (flag === 'addition') {
            // 加法
            list[this.currentTodo].index++;
        } else if (flag === 'subtraction') {
            // 减法
            list[this.currentTodo].index--;
        }

        this.todoList = list;

    }

    @action
     setTimeoutTodo(flag) {
        console.log('setTimeoutTodo_begin');
        this.sleep(30);
        console.log('setTimeoutTodo_sleep_end');
       this.editCurrentTodo(flag);

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

export default new RootStore();