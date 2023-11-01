
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

// testing 
const arr = [4,67,23,56]
const tree = new Tree(arr)
tree.insert(85)
tree.insert(3)
tree.insert(105)
prettyPrint(tree.root)
let test = tree.find(67)
console.log(tree.height(test))
console.log(tree.depth(test))
console.log(tree.isBalanced())
tree.rebalance()
prettyPrint(tree.root)
