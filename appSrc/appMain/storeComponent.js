import {Component} from 'react';
import RootStore from '../store';

export default class StoreComponent extends Component{
    constructor(props){
        super(props);
        this.rootStore = RootStore;
    }

    getKey(routerName){
        return this.rootStore.routerKeys[routerName];
    }
}