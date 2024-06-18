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

  // Delete the value
  deleteItem(value) {
    this.root = this.deleteNode(this.root, value);
  }

  // Delete node from BST
  deleteNode(node, value) {
    if (node === null) {
      return null;
    } else if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
      return node;
    } else {
      // No children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // Only left children
      if (node.left === null) {
        node = node.right;
        return node;
      }
      // Only right children
      if (node.right === null) {
        node = node.left;
        return node;
      }
      // Two children
      let minn = this.minNode(node.right);
      node.data = minn.data;
      node.right = this.deleteNode(node.right, minn.data);
      return node;
    }
  }

  // Find minimum node from subtree
  minNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.minNode(node.left);
    }
  }

  // Find node with value
  find(value, node = this.root) {
    if (node === null) {
      return null;
    } else if (value == node.data) {
      return node;
    } else if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    }
  }

  // Level order traversal
  levelOrder(callback) {
    if (!this.root) return [];
    let que = [this.root];
    let results = [];
    while (que.length) {
      let node = que.shift();
      if (callback) {
        callback(node);
      } else {
        results.push(node.data);
      }

      if (node.left) que.push(node.left);
      if (node.right) que.push(node.right);
    }
    return callback ? undefined : results;
  }

  // In order traversal
  inOrder(callback) {
    if (!this.root) return [];
    let stack = [];
    let results = [];
    let node = this.root;
    while (node != null || stack.length > 0) {
      while (node != null) {
        stack.push(node);
        node = node.left;
      }
      node = stack.pop();
      if (callback) {
        callback(node);
      } else {
        results.push(node.data);
      }
      node = node.right;
    }
    return results;
  }

  // Pre order traversal
  preOrder(callback) {
    if (!this.root) return [];
    let stack = [];
    let results = [];
    stack.push(this.root);
    while (stack.length > 0) {
      let node = stack.pop();
      if (callback) {
        callback(node);
      } else {
        results.push(node.data);
      }
      if (node.right !== null) stack.push(node.right);
      if (node.left !== null) stack.push(node.left);
    }
    return results;
  }

  // Post order traversal
  postOrder(callback) {
    if (!this.root) return [];
    let stack1 = [];
    let stack2 = [];
    let results = [];
    stack1.push(this.root);
    while (stack1.length > 0) {
      let node = stack1.pop();
      stack2.push(node);
      if (node.left) {
        stack1.push(node.left);
      }
      if (node.right) {
        stack1.push(node.right);
      }
    }
    while (stack2.length > 0) {
      let node = stack2.pop();
      if (callback) {
        callback(node);
      } else {
        results.push(node.data);
      }
    }
    return results;
  }

  // Height of given node
  height(node = this.root) {
    if (node === null) return 0;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Depth of given node
  depth(node = this.root, target, depth = 0) {
    if (node === null) return -1;
    if (node === target) return depth;
    let leftDepth = this.depth(node.left, target, depth + 1);
    if (leftDepth !== -1) {
      return leftDepth;
    }
    let rightDepth = this.depth(node.right, target, depth + 1);
    if (rightDepth !== -1) {
      return rightDepth;
    }
    return -1;
  }

  // Check if tree is balanced
  isBalanced() {
    let node = this.root;
    const checkBalance = (node) => {
      if (node === null) return 0;
      let left = checkBalance(node.left);
      let right = checkBalance(node.right);

      if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
        return -1;
      } else {
        return Math.max(left, right) + 1;
      }
    };
    return checkBalance(node) !== -1;
  }

  // Rebalance tree
  rebalance() {
    let array = this.inOrder();
    this.root = this.buildBalancedTree(array, 0, array.length - 1);
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
t1.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
console.log(t1.isBalanced());
console.log(t1.levelOrder());
console.log(t1.preOrder());
console.log(t1.postOrder());
console.log(t1.inOrder());
t1.insert(6345);
t1.insert(324);
t1.insert(478);
t1.insert(732);
t1.insert(298);
console.log(t1.isBalanced());
t1.rebalance();
console.log(t1.isBalanced());
console.log(t1.levelOrder());
console.log(t1.preOrder());
console.log(t1.postOrder());
console.log(t1.inOrder());
