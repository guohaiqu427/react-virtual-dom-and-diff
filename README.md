# react-in-depth

# virtual dom

## Intro
    virtual dom object is js object
    minimlize dom muniplation
    
1. 第一次创建dom对象后， 会对所有的dom对象创建virtual dom 对象
2. 在dom 对象更新之前， 会先更新 virtual dom 对象， 
3. 对比前后的 virtual dom 对象
4. 更新变化的 virtual dom 对象 对应的 dom 对象

## 1. create virtual dom

    flow： babel(jsx) --> React.createElement(tag, prop, children) --> Virtual DOM

        Setup dev dependencies
            "@babel/core"
            "@babel/preset-env"
            "@babel/preset-react"
            "babel-loader"
            "clean-webpack-plugin"
            "html-webpack-plugin"
            "webpack"
            "webpack-cli"
            "webpack-dev-server"
    
        1. Babel, 
            use webpack to compile, set rules: use babel to compile js file, in the babelrc config file, change to tinyReact. 

        2. React.createElement(tag, prop, children) 
            inside src file, create tinyReact.createElement, which is the file babel points at (step 1)

        3. createElement function
            1. boolean value does not render [reduce mathod]
                props: {textContent: false} => doesnt render 
            2. add children as a property of props [object.assign]

## 2. virtual DOM object --> DOM object --> add attribute
        render (Virtualdom, container) 
            diff() ---(oldDOM?)---> yes
            diff() ---(oldDOM?)---> no  
                mountElement(): virturlDOM --- DOM
                    --> native mountNativeElement() ===> HERE
                    --> component  : link to 3
                                   
        updateNodeElement(newElement, virtualDOM) 
            --> class
            --> event 
            --> value
            --> general
            --> childern

## 3. render components 
        link to: 2. mountElement() / component
        the type property of a component's virtual dom is a function 
        class component's type property's function has a render function 

## 4. update virtual dom
    1. store old virtual dom 
        // before creating actuall dom, store virtaul dom as a property on the actual dom object
    2. get new virtual dom 
    3. compare and update: same node type, text node and element node, attribute and evenlistener
    4. compare and update: different node type --> create new dom with new virtual dom
    5. delete node: happens after children are compared, compare length and delete extra




    test

    ss