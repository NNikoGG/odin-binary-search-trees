# Binary Search Trees (BST) Implementation in Javascript

This project provides a JavaScript implementation of a binary search tree (BST). A BST is a data structure that organizes data in a hierarchical manner. Each node in the tree has at most two children, referred to as the left child and the right child. This implementation allows for basic tree operations such as insertion, deletion, and searches, as well as tree traversal methods and checks for tree properties like balance.

## Features

- **Build Tree:** Construct a balanced BST from a sorted array.
- **Insertion and Deletion:** Add and remove elements from the tree.
- **Search:** Find a node in the tree.
- **Traversal:** Perform in-order, pre-order, post-order, and level-order traversals.
- **Check Balance:** Determine if the tree is balanced.
- **Rebalance:** Rebalance the tree.
- **Tree Height and Depth:** Calculate the height of any node and the depth of any node from the root.
- **Pretty Print:** Visually display the tree structure in the console.

## Usage

### Creating and Populating a Tree

```
const t1 = new Tree();
t1.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
```

### Inserting Nodes

```
t1.insert(6345);
t1.insert(324);
```

### Checking if Tree is Balanced

```
console.log(t1.isBalanced());  // Output: true or false
```

### Tree Traversals

```
console.log('Level Order:', t1.levelOrder());
console.log('Pre Order:', t1.preOrder());
console.log('Post Order:', t1.postOrder());
console.log('In Order:', t1.inOrder());
```

### Rebalancing the Tree

```
t1.rebalance();
console.log('Balanced:', t1.isBalanced());
```

### Visualizing the Tree

```
prettyPrint(t1.root);
```
