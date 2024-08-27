

class Node{

    constructor(value){
        this.value=value;
        this.right=null;
        this.left=null;
    }
    
}


class Tree{

    constructor(){
        this.root=null;
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


    insert(value){
        let newNode=new Node(value);
        if (this.root===null){
            this.root=newNode;
        }
        else{
            this.insertNode(this.root,newNode)
        }
    }

    insertNode(node, newNode){
        if (newNode.value<node.value){
            if (node.left===null){
                node.left=newNode;
            }
            else{
                this.insertNode(node.left, newNode);
            }
        }
        else{
            if(node.right===null){
                node.right=newNode;
            }
            else{
                this.insertNode(node.right, newNode);
            }
        }

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
            let queue=[this.root]
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



function mutliply(node){
    node.value=2*node.value;
    return(node);
}

a= new Tree();



a.buildTree([45,1,2,89,32,112,46,78,8,453,8900]);
//console.log(a.root.value);

a.insert(65);
a.deleteItem(112);

prettyPrint(a.root);

console.log(a.isBalanced())