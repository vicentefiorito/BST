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
        // this gets the length of the array for generation of nodes
        
        return sortedArr
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
// testing 
arr = [5,8,34,23,56,4,5,6,8,63,45]
tree = new Tree(arr)
console.log(tree)

