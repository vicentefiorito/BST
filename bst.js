// Node class
class Node{
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

// Tree Class
class Tree{
    constructor(arr){
        this.root = this.buildTree(arr)
        this.inOrderTraversal = []
        this.preOrderTraversal = []
        this.postOrderTraversal = []
    }

    // builds the tree
    buildTree(arr){
        // sorted array
        const sortedArr = this.sortArray(arr)
        // remove duplicates from the sorted array
        const uniqueArray = this.removeDuplicates(sortedArr)
        // this gets the array length to be used for the generations of nodes
        const n = uniqueArray.length

        // add nodes to the tree
        const root = this.addNode(uniqueArray,0,n-1)
        return root
    }

    // this function puts nodes into the tree
    addNode(arr,start,end) {
        // if we have ran through the whole array
        if(start > end) return null
        // gets the middle element
        const mid = parseInt((start + end)/2,10)

        // generates the new node to be inserted into the tree
        const node = new Node(arr[mid])

        // sets the left and the right childs recursively
        node.left = this.addNode(arr,start,mid-1)
        node.right = this.addNode(arr,mid+1,end)
        return node
    }

    // sorts the array
    sortArray(arr) {
        const sorted = arr.sort((a,b) => a-b)
        return sorted
    }

    // removes duplicates
    removeDuplicates(arr){
        const uniques = [...new Set(arr)]
        return uniques
    }

    // inserts a new key into the BST
    insert(value,root=this.root){
        // if the tree is empty, generates a new root with this value
        if(root === null) {
            root = new Node(value)
            return root;
        }

        // recur down the tree
        if(value < root.value) {
            root.left = this.insert(value,root.left)
        } else if(value > root.value) {
            root.right = this.insert(value,root.right)
        }

        // returns the unchanged root pointer
        return root
    }

    delete(value, root = this.root) {
        if (root === null) {
            console.log('Cannot delete node as is not in the BST')
            return root; // Value not found in the BST
        }
      
        // If the value to be deleted is smaller than the root's value, then it lies in the left subtree
        if (value < root.value) {
          root.left = this.delete(value, root.left);
          return root;
        }
      
        // If the value to be deleted is greater than the root's value, then it lies in the right subtree
        if (value > root.value) {
          root.right = this.delete(value, root.right);
          return root;
        }
      
        // If the value is found, this is the node to be deleted
        // Case 1: Node with only one child or no child
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        }
      
        // Case 2: Node with two children
        // Get the inorder successor (the smallest node in the right subtree)
        root.value = this.minValue(root.right);
      
        // Delete the inorder successor
        root.right = this.delete(root.value, root.right);
      
        return root;
    }

    // helper function to find the inorder successor for node deletion (smallest node in the right subtree)
    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }



    // function that finds an specific function in the BST
    find(value,root=this.root) {
        // if the value is not in the BST
        if(root === null) {
            console.log(`Value: ${value} is not in the BST`)
            return null
        }
        
        if(value === root.value) {
            console.log(`Value: ${value} has been found in the bst`)
            return root
        }
        // if the value is less than the current root, we look to the left subtree
        if(value < root.value) return this.find(value,root.left)
        // if the value is greater than the current root, we look to the right subtree
        if(value > root.value) return this.find(value,root.right)
    }

    // callback function that pushes the node into the traversal array
    traversal(arr,value) {
        arr.push(value)
    }

    // function that gives the level order traversal of the BST
    levelOrder(func = this.traversal) {
        let result = []
        // if the tree is empty
        if(this.root === null) {
            return
        }
        // traverse through the tree
        let queue = [this.root]
        while(queue.length > 0) {
            let current = queue.shift()
            func(result,current.value)
            if(current.left !== null) {
                queue.push(current.left)
            }
            if(current.right !== null) {
                queue.push(current.right)
            }
        }
        console.log('LevelOrder traversal --> ', result)
        return result;
    }

    // main function that calls the inorder traversal
    inOrder(){
        return this.inOrderRec()
    }

    // helper function that gives the inorder traversal of the BST
    inOrderRec(func = this.traversal, root = this.root) {
        if(root === null) return
        // traverse the tree --> left --> root --> right
        this.inOrderRec(func,root.left)
        func(this.inOrderTraversal,root.value)
        this.inOrderRec(func,root.right)
        return this.inOrderTraversal
    }

    // main function that calls the preorder
    preOrder() {
        return this.preOrderRec()
    }

    // helper function that recursively gives the preorder traversal of the BST
    preOrderRec(func = this.traversal, root = this.root) {
        // if tree is empty
        if(root === null) return
        // traverses the tree --> root --> left --> right
        func(this.preOrderTraversal,root.value)
        this.preOrderRec(func,root.left)
        this.preOrderRec(func,root.right)
        return this.preOrderTraversal
    }

    // main function that calls the postorder function
    postOrder() {
        return this.postOrderRec()
    }

     // helper function that recursively gives the postorder traversal of the BST
     postOrderRec(func = this.traversal, root = this.root) {
        // if tree is empty
        if(root === null) return
        // traverses the tree --> left --> right --> root
        this.postOrderRec(func,root.left)
        this.postOrderRec(func,root.right)
        func(this.postOrderTraversal,root.value)
        return this.postOrderTraversal
    }

    // function to return the height of a node
    height(node) {
        // if the tree is empty, -1 because there is an empty pointer to null if there is a leaf node
        if(node === null) return -1
        // recursively find the height of the left subtree and rightsubtree
        let leftHeight = this.height(node.left)
        let rightHeight = this.height(node.right)
        return Math.max(leftHeight,rightHeight) + 1
    }

    // function that returns the depth of a node
    depth(node,root= this.root) {
        // if the node you are looking for is the root, depth 0
        if(node.value === root.value) return 0
        // if the value you are looking for is less than the root, calculate the depth of the left subtree and add 1 to the depth
        if(node.value < root.value) return this.depth(node,root.left) + 1
        // if the value you are looking for is greater than the root, calculate the depth of the right subtree and add 1 to the depth
        if(node.value > root.value) return this.depth(node,root.right) + 1
    }

}

// visualization method
const prettyPrint = (root, prefix = "", isLeft = true) => {
    if (root === null) {
      return;
    }
    if (root.right !== null) {
      prettyPrint(root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.value}`);
    if (root.left !== null) {
      prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

// testing 
arr = [4,67,23,56]
tree = new Tree(arr)
prettyPrint(tree.root)
let test = tree.find(4)
console.log(tree.height(test))
console.log(tree.depth(test))
