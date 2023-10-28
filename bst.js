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
        const sortedArr = this.sortArray(arr)
        return sortedArr
    }

    // sorts the array
    sortArray(arr) {
        const sorted = arr.sort((a,b) => a-b)
        return sorted
    }
}
// testing 
arr = [5,8,34,23,56,4]
tree = new Tree(arr)
console.log(tree)

