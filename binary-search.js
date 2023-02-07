class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const mid = Math.floor(sortedArray.length / 2);
    const newNode = new Node(sortedArray[mid]);
    newNode.left = this.buildTree(sortedArray.slice(0, mid));
    newNode.right = this.buildTree(sortedArray.slice(mid + 1));
    return newNode;
  }

  insert(data, node = this.root) {
    if (node === null) return new Node(data);
    if (node.data === data) return;

    if (node.data < data) {
      node.right = this.insert(data, node.right);
    } else {
      node.left = this.insert(data, node.left);
    }
    return node;
  }

  deleteKey(data) {
    this.root = this.deleteKey(this.root, data);
  }

  delete(node = this.root, data) {
    if (node === null) return null;
    else if (data < node.data) {
      node.left = this.delete(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.delete(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      let mini = this.minValue(node.right);
      node.data = mini.data;
      node.right = this.delete(node.right, mini.data);
      return node;
    }
  }

  minValue(node = this.root) {
    if (node.left === null) {
      return node;
    } else return this.minValue(node.left);
  }

  find(node = this.root, data) {
    if (node == null || node.data === data) return node;
    if (node.data < data) return this.find(node.left, data);
    else return this.find(node.right, data);
  }

  levelOrder(node = this.root) {
    if (node === null) return [];

    const queue = [node];
    const result = [];

    while (queue.length) {
      let len = queue.length;
      result.push(queue.map((eachNode) => eachNode.data));

      while (len--) {
        let currentNode = queue.shift();
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }
    }
    return result;
  }

  preorder(node = this.root) {
    if (!node) return [];
    const result = [];

    const preorderHelper = (currentNode) => {
      if (!currentNode) return null;

      result.push(currentNode.data);
      if (currentNode.left) preorderHelper(currentNode.left);
      if (currentNode.right) preorderHelper(currentNode.right);
    };

    preorderHelper(node);
    return result;
  }

  inorder(node = this.root) {
    if (!node) return [];
    const result = [];

    const inorderHelper = (currentNode) => {
      if (!currentNode) return null;

      if (currentNode.left) inorderHelper(currentNode.left);
      result.push(currentNode.data);
      if (currentNode.right) inorderHelper(currentNode.right);
    };

    inorderHelper(node);
    return result;
  }

  postorder(node = this.root) {
    if (!node) return [];
    const result = [];

    const postrderHelper = (currentNode) => {
      if (!currentNode) return null;

      if (currentNode.left) postrderHelper(currentNode.left);
      if (currentNode.right) postrderHelper(currentNode.right);
      result.push(currentNode.data);
    };

    postrderHelper(node);
    return result;
  }

  height(node = this.root) {
    if (!node) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node = this.root) {
    if (!node) return 0;
    return Math.max(this.depth(node.left), this.depth(node.right)) + 1;
  }

  balance(node = this.root) {
    let result = [];
    this.balanceHelper(node, result);
    return this.balanceBuilder(result);
  }

  balanceHelper(node = this.root, result) {
    if (!node) return;

    this.balanceHelper(node.left, result);
    result.push(node.data);
    this.balanceHelper(node.right, result);

    return result;
  }

  balanceBuilder(result) {
    if (result.length === 0) return null;

    let mid = Math.floor(result.length / 2);
    let head = new Node(result[mid]);

    let left = result.slice(0, mid);
    let right = result.slice(mid + 1);

    head.left = this.balanceBuilder(left);
    head.right = this.balanceBuilder(right);

    return head;
  }

  isBalanced(node = this.root) {
    if (!node) return 0;

    let left = this.isBalanced(node.left);
    let right = this.isBalanced(node.right);
    let rizz = Math.abs(left - right);

    if (left === -1 || right === -1 || rizz > 1) return false;
    else return true;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "|   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
    }
  }
}

const randomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};
const tree = new Tree(randomArray(10));
tree.insert(10);
tree.prettyPrint();
console.log(tree.height());
console.log(tree.depth());
console.log(tree.balance());
tree.balance();
console.log(tree.isBalanced());
tree.prettyPrint(tree.balance());
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());
