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