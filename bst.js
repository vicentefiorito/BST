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
arr = [7,4,9,5]
tree = new Tree(arr)
prettyPrint(tree.root)
tree.insert(56)
prettyPrint(tree.root)
tree.delete(7)
prettyPrint(tree.root)
tree.delete(23)
