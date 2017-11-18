class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left != null && this.right != null)
			return;

		if(this.left == null)
			this.left = node;
		else
			this.right = node;
		node.parent = this;
	}

	removeChild(node) {
		if(this.right == node)	
			this.right = null;
		else if(this.left == node)
			this.left = null;
		else
			throw new Error();
		node.parent = null;
	}

	remove() {
		if(this.parent != null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		
		if (this.parent) {
			var prevParent = this.parent.parent;
			var oneParent = this.parent;
			var sibling;
			var leftSon = this.left;
			var rightSon = this.right;

			if (prevParent) {
				if (this.parent === prevParent.left) {
					prevParent.left = this;
				} else if (this.parent === prevParent.right) {
					prevParent.right = this;
				}
			}

			if (this === oneParent.left){
				sibling = this.parent.right;
				this.right = sibling;
				this.left = oneParent;
			} else if (this === oneParent.right){
				sibling = this.parent.left;
				this.left = sibling;
				this.right = oneParent;
			}

			this.parent = prevParent;

			if (sibling) { sibling.parent = this };
			oneParent.parent = this;
			oneParent.left = leftSon;
			oneParent.right = rightSon;
			if (leftSon) { leftSon.parent = oneParent };
			if (rightSon) { rightSon.parent = oneParent };
		}
	}
		
}

module.exports = Node;
