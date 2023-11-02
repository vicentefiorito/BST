
import Tree from "./tree.js"

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

//   generate array from where the tree will be formed
const generateRandomArray = (n) => {
    let res = []
    for(let i = 0; i < n; i++) {
        const num = Math.floor(Math.random() * 101)
        res[i] = num
    }
    return res
}

// adds a number to the tree
const addNumber = (n) => {
    const res = generateRandomArray(n)
    for(let i = 0; i < n; i++) {
        tree.insert(res[i])
    }
}


// driver script
const arr = generateRandomArray(9)
const tree = new Tree(arr)
prettyPrint(tree.root)
console.log('Is the Tree balanced?: ',tree.isBalanced(tree.root)) //true
console.log('Level Order Traversal --> ',tree.levelOrder())
console.log('Pre Order Traversal --> ', tree.preOrder())
console.log('In Order Traversal --> ',tree.inOrder())
console.log('In Order Traversal --> ',tree.postOrder())

addNumber(101) //adds 101 random numbers to the tree
prettyPrint(tree.root)
console.log('Is the Tree balanced?: ',tree.isBalanced()) //false
tree.rebalance()

prettyPrint(tree.root)
console.log('Is the Tree balanced?: ',tree.isBalanced()) //true
console.log('Level Order Traversal --> ',tree.levelOrder())
console.log('Pre Order Traversal --> ', tree.preOrder())
console.log('In Order Traversal --> ',tree.inOrder())
console.log('In Order Traversal --> ',tree.postOrder())




