# Reddit's Clone

## PROJECT SUMMARY

![screenshot](./src/images/app_preview.png?raw=true)

Cloned Reddit's frontend by using Reat-Redux

## Technologies used

- React-Redux
- Sass/Scss
- CSS-Grid

## Install/Start

- npm install on terminal
- npm run local

## React-Redux's architecture

💠 How data flows from **APIs**'s into Component-level. It is essential that you understand how the data are flowing from APIs to thunk/middleware and then arrived to the Components level, and how date are updated at the Component level & consolided at the container level

**APIs -> thunk/middleware -> rootReducer -> container -> page -> component**

- thunk/middleware: manipulate data from **APIs**, and then dispatch it to **rootReducer** through an action
- rootReducer: A predictable state container for your application where the states are stored as a single Object, from there it allows us to access the state, and update the state through an action called dispatch
- container: fetch app's state from rootReducer, and use it to render components. This is also where you can manage your React lifecycle, see note below for details.
- page: consolidate state to be pass onto Component-level in form of **_props_**
- component: where **_props_** are utilized by HTML. Component can only render if there is a change in the **rootReducer** or through the use of **setState**

💠 How React's **Component lifecycle** affects how the data flows into the Component-level or render the Component

**Birth/Mounting** 👶
<br/>
The first phase of the React Component lifecycle, this is where we start initialization of the Component. At this phase, the Component's props and states are defined and configured. The Component and all its children are mounted on to the Native UI Stack (DOM, UIView, etc.). Finally,we can do post-processing if required. The Birth/Mounting phase only occurs once. All of the methods in this cycle only called ONCE, they are as follow:

1. Initialize/Construction
2. getDefaultProps() (React.createClass) or MyComponent.defaultProps (ES6 class)
3. getInitialState() (React.createClass) or this.state = ... (ES6 constructor)
4. render()
5. Children initialization & life cycle kickoff
6. componentDidMount()

**Growth/Update** 🧑
<br/>
The next phase of the lifecycle is the Growth/Update phase. In this phase, we get new props, change state, handle user interactions and communicate with the component hierarchy. Overall, the growth phase is triggered in three different ways: changing of props, changing of state or calling forceUpdate(). This is where we spend most of our time in the Component's life. Unlike Birth or Death, we can repeat this phase as many times as necessary.

1. shouldComponentUpdate(nextProps, nextState)
2. render()
3. getSnapshotBeforeUpdate(prevProps, preState)
4. Read updates DOM and refs
5. componentDidUpdate(preProps, preState)

**Death/Unmount** 💀
<br/>
The final phase of the lifecycle is the Death/Unmount phase. This phase occurs when a component instance is unmounted from the Native UI. This can occur when the user navigates away, the UI page changes, a component is hidden (like a drawer), etc. Death occurs once and readies the Component for Garbage Collection.

1. componentWillUnmount()
2. Children Life cycle methods
3. Instance destroyed for Garbage Collection
