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
arr = [5,8,34,23,56,4,5,6,8,63,45]
tree = new Tree(arr)
prettyPrint(tree.root)
