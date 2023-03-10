import createDOMElement from "./createDOMElement"
import mountElement from "./mountElement"
import updateNodeElements from "./updateNodeElement"
import updateTextNode from "./updateTextNode"
import unmountNode from "./unmountNode"
import diffComponent from "./diffComponent"

export default function diff( virtualDOM,container,oldDOM) {
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
    const oldComponent = oldVirtualDOM && oldVirtualDOM.component
    if(!oldDOM){
        // no old DOM! 
        mountElement(virtualDOM, container)
    }
    else if(oldVirtualDOM.type !== virtualDOM.type && typeof virtualDOM.type !== 'function'){
        const newElement = createDOMElement(virtualDOM)
        oldDOM.parentNode.replaceChild(newElement, oldDOM)
    }
    else if(typeof virtualDOM.type === 'function'){
        diffComponent(virtualDOM,oldComponent,oldDOM,container)

    }
    else if(oldVirtualDOM && oldVirtualDOM.type === virtualDOM.type){
        if(virtualDOM.type ==="text"){
            // update text
            updateTextNode(oldVirtualDOM, virtualDOM, oldDOM)
        }
        else{
            // update element
            updateNodeElements(oldDOM,virtualDOM,oldVirtualDOM)
        }
        
        virtualDOM.children.forEach((child, i) => {
            diff(child,oldDOM, oldDOM.childNodes[i])
        });

        let keyedElement = {}
        for(let i=0; i<oldDOM.childNodes.length; i++){
           let domElement = oldDOM.childNodes[i]
          if( domElement.nodeType === 1){
            let key = domElement.getAttribute("key")
            if (key) { keyedElement[key] =  domElement }
          }
        }

        let hasNoKey = Object.keys(keyedElement).length === 0

        if(hasNoKey){
            virtualDOM.children.forEach((child, i) => {
                diff(child,oldDOM, oldDOM.childNodes[i])
            });
        }else{
            virtualDOM.children.forEach((child, i) => {
                let key = child.props.key
                if(key) {
                    let domElement = keyedElement[key]
                    if(domElement){
                        if(oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement){
                            oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
                        }
                    } else {
                        mountElement(child, oldDOM, oldDOM.childNodes[i])
                    }
                }
            })

        }

        let oldchildNodes = oldDOM.childNodes
        if(oldchildNodes.length > virtualDOM.children.length){
            if(hasNoKey){
                for(let i = oldchildNodes.length-1; i>virtualDOM.children.length-1; i--){
                    unmountNode(oldchildNodes[i])
                }
            }else{
                for(let i=0; i<oldchildNodes.length; i++){
                    let oldChild = oldchildNodes[i]
                    let oldChildKey = oldChild._virtualDOM.props.key
                    let found = false
                    for(let n=0; n<virtualDOM.children.length; n++){
                         if(virtualDOM.children[n].props.key ===oldChildKey){
                            found = true
                            break
                         }
                    }
                    if(!found){
                        unmountNode(oldChild)
                    }
                }
            }
           
        }
    }
  
}