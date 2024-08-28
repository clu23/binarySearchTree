

class Node{

    constructor(value){
        this.value=value;
        this.right=null;
        this.left=null;
    }
    
}


class Tree{

    constructor(array){
        this.root=this.buildTree(array);
    }

    buildTree(array){
        if (array.length>0){
            if (array.length>1){
                const sortedArray=array.toSorted((a, b) => a - b);
                const middle = parseInt(sortedArray.length/2);
                let node = new Node (sortedArray[middle]);
                node.left=this.buildTree(sortedArray.slice(0,middle));
                node.right=this.buildTree(sortedArray.slice(middle+1,sortedArray.length))
                this.root=node;
                return(node);
            }
            else{
                let node=new Node(array[0]);
                this.root=node;
                return(node);
                
            }
        }
        else {
            return(null);
        }
    }


    insert(value,root=this.root){
        let newNode=new Node(value);
        if (root===null){
            root=newNode;
        }
        else{
            if(root.value===value){
                return
            }
            else{
                if(value<root.value){
                    root.left=this.insert(value,root.left);
                }
                else{
                    root.right=this.insert(value, root.right);
                }
            }
        }
        return(root);
    }


    isIn(value,root=this.root){;
        if (root===null){
            return(false)
        }
        else{
            if (root.value===value){
                return(true);
            }
            else{
                return(this.isIn(value,root.left)|| this.isIn(value, root.right))
            }
        }
    }

    getSuccessor(curr){
        curr=curr.right;
        while(curr !== null && curr.left !== null){
            curr=curr.left;
        }
        return(curr);
    }


    deleteItem(value,root=this.root){
        let lastParent=root;
        if (root !==null){
            if (this.isIn(value,root)===true){
                while(root.value !==value){
                    if (value<root.value){
                        lastParent=root;
                        root=root.left;
                    }
                    else{
                        lastParent=root;
                        root=root.right;
                    }
                }
                if (root.right===null){
                    if (value<lastParent.value){
                        lastParent.left=root.left
                    }
                    else{
                        lastParent.right=root.left;
                    }
                }
                else if (root.left===null){
                    if (value<lastParent.value){
                        lastParent.left=root.right;
                    }
                    else{
                        lastParent.right=root.right;
                    }
                }
                else{
                    let successorValue=this.getSuccessor(root).value;
                    root.value=successorValue;
                    this.deleteItem(successorValue, root.right);
                }  
            }
        }
    }


    find(value){
        if (!this.isIn(value)){
            return(null);
        }
        else{
            let node=this.root;
            while(node.value !==value){
                if (this.isIn(value,node.left)){
                    node=node.left;
                }
                else{
                    node=node.right;
                }
            }
            return(node);
        }
    }

    levelOrder(callback,node){
        if (callback===undefined){
            throw new Error('A callback function is required!');
        }
        else{
            let queue=[this.root];
            while(queue.length>0){
                queue[0]=callback(queue[0]);
                if (queue[0].left !== null){
                    queue.push(queue[0].left);
                }
                if (queue[0].right !==null){
                    queue.push(queue[0].right);
                }
                queue=queue.slice(1);
            }
        }
    }

    inOrder(callback, node=this.root){
        if (callback===undefined){
            throw new Error('A callback function is required!');
        }
        else{
            if (node !==null){
                this.inOrder(callback,node.left);
                node=callback(node);
                this.inOrder(callback,node.right);
            }
        }
    }

    preOrder(callback, node=this.root){
        if (callback===undefined){
            throw new Error('A callback function is required!');
        }
        else{
            if (node !==null){
                node=callback(node);
                this.preOrder(callback,node.left);
                this.preOrder(callback,node.right);
            }
        }
    }

    postOrder(callback, node=this.root){
        if (callback===undefined){
            throw new Error('A callback function is required!');
        }
        else{
            if (node !==null){
                this.postOrder(callback,node.left);
                this.postOrder(callback,node.right);
                node=callback(node);
            }
        }
    }


    height(node){
        if (node===null){
            return(0);
        }
        else{
            let leftHeight=0;
            let rightHeight=0;
            if (node.left !==null){
                leftHeight=1+this.height(node.left);
            }
            if (node.right !==null){
                rightHeight=1+this.height(node.right);
            }
            return(Math.max(leftHeight,rightHeight))
        }
    }

    depth(node, root=this.root){
        if (node == root){
            return(0)
        }
        else{
            if (node !== null){
                if (this.isIn(node.value,root.left)){
                    return(1+this.depth(node,root.left))
                }
                else{
                    return(1+this.depth(node,root.right))
                }
            }
        }
    }

    isBalanced(){
        let leftSize=this.height(this.root.left);
        let rightSize=this.height(this.root.right);
        if (Math.abs(leftSize-rightSize)>1){
            return(false);
        }
        else{
            return(true);
        }
    }

    rebalance(){
        if (!this.isBalanced()){
            let nodeList=[this.root];
            let valueList=[];
            while(nodeList.length>0){
                valueList.push(nodeList[0].value);
                if (nodeList[0].left !== null){
                    nodeList.push(nodeList[0].left);
                }
                if (nodeList[0].right !==null){
                    nodeList.push(nodeList[0].right);
                }
                nodeList=nodeList.slice(1);
            }
            if (valueList.length>0){
                this.root=this.buildTree(valueList);
            }
        }
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };



function multiply(node){
    node.value=2*node.value;
    return(node);
}

function printValue(node){
    console.log(node.value)
    return(node)
}


// randomly generated N = 40 length array 0 <= A[N] <= 100
randomArray=Array.from({length: 40}, () => Math.floor(Math.random() * 100));


a= new Tree(randomArray);

console.log(a.isBalanced())






