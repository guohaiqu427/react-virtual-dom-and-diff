import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";
import isFunction from "./isFunction";

export default function mountComponent(virtualDOM, container) {
    let nextVirtualDOM = null;

    if(isFunctionComponent(virtualDOM)){
        // function component     
        nextVirtualDOM = extract(virtualDOM)
    }else{
    // class component 
    }

    if(isFunction(nextVirtualDOM)){
        mountComponent(nextVirtualDOM,container)
    }else{
        mountNativeElement(nextVirtualDOM, container)
    }
} 

function extract (virtualDOM){
    return virtualDOM.type(virtualDOM.props || {})
}