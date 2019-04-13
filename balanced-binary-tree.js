class BalancedBinaryTree {

  constructor(value) {
    this.value = value;
    this.parent = { node: null, side: ''};
    this.left = null;
    this.right = null;
  }

  balanceFactor() {
    return this.height(this.left) - this.height(this.right);
  }

  height(node) {
    if (!node) {
      return -1;
    } else {
      return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }
  }
  
  insert(value) {
    if (value === this.value) {
      return;
    } else if (value < this.value) {
      if (this.left !== null) {
        this.left.insert(value);
      } else {
        this.left = new BalancedBinaryTree(value);
        this.left.parent.node = this;
        this.left.parent.side = 'left';
      }
    } else {
      if (this.right !== null) {
        this.right.insert(value);
      } else {
        this.right = new BalancedBinaryTree(value);
        this.right.parent.node = this;
        this.right.parent.side = 'right';
      }
    }
  }

  contains(value) {
    if (value === this.value) {
      return true;
    } else if (value < this.value) {
      if (this.left !== null) {
        return this.left.contains(value);
      } else {
        return false;
      }
    } else {
      if (this.right !== null) {
        return this.right.contains(value);
      } else {
        return false;
      }
    }
  }

  depthFirstLog() {
    callback(this.value);
    if (this.left !== null) {
      this.left.depthFirstLog(callback);
    }
    if (this.right !== null) {
      this.right.depthFirstLog(callback);
    }
  }

  leftRotate(rootNode) {
    //  root, pivot
    //  pivot is to right of root, root is pivot's left parent
    //  pivot's child becomes root's child
    
  
  }
  
  rightRotate(rootNode) {
    /*
    The pivot node’s parent is now going to be the parent node (20), 
    and the parent node’s new left is going to be the old pivot node. 
    The pivot node’s right will be the old root node, and the old root 
    node’s parent will be the pivot node, or new root node. The old 
    root node’s left will now be null. If the new root node initially 
    had a right child, that would have become the old root node’s 
    left. 
    */
    var pivot = rootNode.left;
    
    //  reassign the parent of the pivot to the rootnode's parent
    //    only if root node has a parent
    pivot.parent.node = rootNode.parent.node;
    pivot.parent.side = 'left';
    //  make the pivot the left child of the root's parent
    rootNode.parent.left = pivot;

    //  save the pivot's right node if there is one
    var pivotRightChild = pivot.right;
    
    //  reassign the parent of the root to the pivot
    rootNode.parent.node = pivot;
    rootNode.parent.side = 'right';
    //  make the rootNode the right child of the pivot
    pivot.right = rootNode;

  }

  checkAndRotateRoots(root) {
    //  check if root is unbalanced
    //    balance factor outside range [-1, 1]
    //    if so, rotate root
    //    check parent node too
    if (root) {
      var bf = root.balanceFactor();
      if (bf < -1 || bf > 1) {
        rotate(root);
      }
      checkAndRotateRoots(root.parent.node);
    }
  }

  rotate(root) {
    if (root.balanceFactor() > 1) {
      // unbalanced to left, rotate right
      // check for need for left-right rotation
      if (root.left.balanceFactor === 1) {
        leftRotate(root.left);
      }
      rightRotate(root);
    } else if (root.balanceFactor() < 1) {
      // unbalanced to right, rotate left
      if (root.right.balanceFactor === -1) {
        rightRotate(root.right);
      }
    }
  }
  
}