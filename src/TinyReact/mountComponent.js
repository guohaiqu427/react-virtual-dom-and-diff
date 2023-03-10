import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";
import isFunction from "./isFunction";

export default function mountComponent(virtualDOM, container, oldDOM) {
    let nextVirtualDOM = null;
    let component = null
    if(isFunctionComponent(virtualDOM)){
        // function component     
        nextVirtualDOM = extract(virtualDOM)
    }else{
    // class component 
        nextVirtualDOM = extract_Component(virtualDOM)
        component = nextVirtualDOM.component
    }

    if(isFunction(nextVirtualDOM)){
        mountComponent(nextVirtualDOM,container,oldDOM)
    }else{
        mountNativeElement(nextVirtualDOM, container, oldDOM)
    }

    if(component && component.props && component.props.ref){
        component.componentDidMount()
        component.props.ref(component)
    }
} 

function extract (virtualDOM){
    return virtualDOM.type(virtualDOM.props || {})
}

function extract_Component(virtualDOM){

    const component = new virtualDOM.type(virtualDOM.props ||{})
    const nextVirtualDOM = component.render()
    nextVirtualDOM.component = component
    return nextVirtualDOM

}