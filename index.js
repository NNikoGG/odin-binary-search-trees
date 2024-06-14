// Define node
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Define tree
class Tree {
  constructor() {
    this.root = null;
  }

  buildTree(array) {
    // Sort and remove duplicate values from array
    array = [...new Set(array.sort((a, b) => a - b))];
    console.log(array);
    this.root = this.buildBalancedTree(array, 0, array.length - 1);
  }

  buildBalancedTree(array, start, end) {
    // Traversal ends
    if (start > end) {
      return null;
    }

    // Root node
    let mid = parseInt((start + end) / 2);
    let node = new Node(array[mid]);

    // Recursively finding left and right subtree for all elements
    node.left = this.buildBalancedTree(array, start, mid - 1);
    node.right = this.buildBalancedTree(array, mid + 1, end);

    return node;
  }

  // Insert new value to the BST
  insert(value) {
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // If root is not empty
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

// Visualize BST
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const t1 = new Tree();
t1.buildTree([6, 9, 3, 1, 2, 13, 11]);
t1.insert(5);
// t1.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(t1.root);
console.log(t1.root);
