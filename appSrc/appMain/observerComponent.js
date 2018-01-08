import {observer} from 'mobx-react/native';
import {Component} from 'react';
import RootStore from '../store';

@observer
export default class ObserverComponent extends Component{
    constructor(){
        super();
        this.rootStore = RootStore;
    }

    componentWillMount() {
    }

    getKey(routerName){
        return this.rootStore.routerKeys[routerName];
    }
}