class BinaryTree {

  constructor(value) {
    this.value = value;
    this.left;
    this.right;
  }

  breadthFirstLogger(callback) {
    //  log left
    //  log right
    //  log left children
    //  log right children
    var depth = 0;
    return function BFL(node, callback) {
      if (!node) {
        return;
      }
      depth++;
      BFL(this.left);
      callback(this.value);
      BFL(this.right);
    }
 }
}