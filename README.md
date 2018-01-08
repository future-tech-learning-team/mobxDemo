# mobxDemo

## 安装

```
yarn add mobx
yarn add mobx-react
```

## @observable
要启用装饰器（@xxxxx写法）,需配置.babelrc
yarn add 安装插件
    "babel-plugin-syntax-decorators": "^6.13.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",

 ```
 {
"presets": ["react-native"],
 "plugins": [
    "syntax-decorators",
    "transform-decorators-legacy"
  ]
}
 ```



可以在实例字段和属性 getter 上使用@observable

```
 class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }
}
```

## computed

 概念上来说，它们与excel表格中的公式十分相似。

 ```
 import { observable, computed } from "mobx";

class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }
}
 ```
 @computed.struct 用于比较结构
@computed 装饰器不需要接收参数。如果你想创建一个能进行结构比较的计算属性时，请使用 @computed.struct。

@computed.equals 用于自定义比较
如果你想创建一个使用自定义比较的计算属性，请使用 @computed.equals(comparer)。

内置比较器
MobX 提供了三个内置 comparers (比较器) ，它们应该能满足绝大部分需求：

comparer.identity: 使用恒等 (===) 运算符来判定两个值是否相同。
comparer.default: 等同于 comparer.identity，但还认为 NaN 等于 NaN 。
comparer.structural: 执行深层结构比较以确定两个值是否相同。


## @observer
observer 函数/装饰器可以用来将 React 组件转变成响应式组件。 它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。 observer 是由单独的 mobx-react 包提供的。

```
@observer class Timer extends React.Component {
    render() {
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
};
```

当 observer 需要组合其它装饰器或高阶组件时，请确保 observer 是最深处(第一个应用)的装饰器，否则它可能什么都不做。

## 组件中的间接引用值
MobX 可以做很多事，但是它无法使原始数据类型值转变成可观察的(尽管它可以用对象来包装它们，参见 boxed observables)。 所以值是不可观察的，但是对象的属性可以


## 可观察的局部组件状态
而不需要通过 React 的冗长和强制性的 setState 机制来管理。 响应式状态会被 render 提取调用，但不会调用其它 React 的生命周期方法，除了 componentWillUpdate 和 componentDidUpdate 。

```
import {observer} from "mobx-react"
import {observable} from "mobx"

@observer class Timer extends React.Component {
    @observable secondsPassed = 0

    componentWillMount() {
        setInterval(() => {
            this.secondsPassed++
        }, 1000)
    }

    render() {
        return (<span>Seconds passed: { this.secondsPassed } </span> )
    }
})

```

## 使用 inject 将组件连接到提供的 stores

mobx-react 包还提供了 Provider 组件，它使用了 React 的上下文(context)机制，可以用来向下传递 stores。 要连接到这些 stores，需要传递一个 stores 名称的列表给 inject，这使得 stores 可以作为组件的 props 使用。


## action (动作)

action 装饰器/函数遵循 javascript 中标准的绑定规则。 但是，Mobx 3引入了 action.bound 来自动地将动作绑定到目标对象。 注意，与 action 不同的是，(@)action.bound 不需要一个name参数，名称将始终基于动作绑定的属性。
 action.bound 不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。


 ```
 const ticker = observable({
    tick: 1,
    increment: action.bound(function() {
        this.tick++ // 绑定 'this'
    })
})

setInterval(ticker.increment, 1000)
 ```

 ## runInAction(name?, thunk)

runInAction 是个简单的工具函数，它接收代码块并在(异步的)动作中执行。这对于即时创建和执行动作非常有用，例如在异步过程中。runInAction(f) 是 action(f)() 的语法糖。
包裹后不会因为多次改变数据而去执行多次渲染，只会在最后执行渲染

```
 @action('Search for user on Github')
  searchForUser = async () => {
    if (!this.searchName) return;
    this.fetchingData = true;
    const [user, repos] = await Promise.all([
      this.fetchFromGithub(`/users/${this.searchName}`),
      this.fetchFromGithub(`/users/${this.searchName}/repos`)
    ]);
    runInAction("Update State after fetching Github's Data", () => {
      this.user = user;
      this.repos = repos;
      this.fetchingData = false;
    });
  };
```
