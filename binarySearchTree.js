

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
        let root=this.root;
        let lastParent=root;
        if (root===null){
            this.root=new Node(value);
        }
        else{
            while (root !==null){
                if (value<root.value){
                    lastParent=root;
                    root=root.left
                }
                else if (value>root.value){
                    lastParent=root;
                    root=root.right;
                }
                else {
                    break
                }
            }
            if (root===null){
                if (value<lastParent.value){
                    lastParent.left=new Node(value);
                }
                else if (value>lastParent.value){
                    lastParent.right= new Node (value);
                }
            }
        }
    }


    deleteItem(value){
        
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


a= new Tree();



a.buildTree([45,1,2,89,32,112,46,78,8,453,8900]);
//console.log(a.root.value);

a.insert(65);

prettyPrint(a.root);