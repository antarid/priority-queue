const Node = require('./node');


class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.size = 0;		
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(!this.isEmpty()){				
			this.size--;
			let root = this.detachRoot();
			this.restoreRootFromLastInsertedNode(root);
			this.shiftNodeDown(this.root);
			return root.data;
		}
	}

	detachRoot() {
		let root = this.root;
		let rootIndex = this.parentNodes.indexOf(root);
		if(rootIndex >= 0)
			this.parentNodes.splice(rootIndex, 1);
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastElement = this.parentNodes.pop();
		let lastElementParent = lastElement.parent;
		
		if(lastElementParent.left == lastElement)
			lastElementParent.left = null;
		else
			lastElementParent.right = null;

		lastElement.parent = null;		
		this.root = lastElement;

		if(detached.left != lastElement){
			lastElement.left = detached.left;
			if(lastElement.left != null)
				lastElement.left.parent = lastElement;
		}

		if(detached.right != lastElement){
			lastElement.right = detached.right;
			if(lastElement.right != null)
				lastElement.right.parent = lastElement;
		}

		if (lastElementParent != detached) {
      this.parentNodes.unshift(lastElementParent);
    }
    this.parentNodes.unshift(lastElement);

    if (this.root.left && this.root.right) {
      this.parentNodes.shift();
    }
	}

	size() {
		return this.size;
	}

	isEmpty() {
		return this.parentNodes.length == 0;
	}

	clear() {
		this.root = null;		
		this.parentNodes = [];
		this.size = 0;
	}

	insertNode(node) {
		if (!this.root) {
      this.root = node;
    } else {
      this.parentNodes[0].appendChild(node);
    }
    this.parentNodes.push(node);
    if (this.parentNodes[0].left && this.parentNodes[0].right) {
      this.parentNodes.shift();
    }
		this.size++;
	}

	shiftNodeUp(node) {
		if(node.parent != null){
			if(node.parent.priority < node.priority){
				let indexOfNode = this.parentNodes.indexOf(node);
				let indexOfParentNode = this.parentNodes.indexOf(node.parent);
				if(indexOfNode >= 0)
					this.parentNodes[indexOfNode] = node.parent;
				if(indexOfParentNode >= 0)
					this.parentNodes[indexOfParentNode] = node;
				node.swapWithParent();
				this.shiftNodeUp(node);				
			}
		}
		else{
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if(node.left != null && node.right != null){
			if(node.priority < node.left.priority && node.priority < node.right.priority)
				return;
			if(node.left.priority > node.right.priority){
				this.shiftNodeUp(node.left);
				this.shiftNodeDown(node);
			}
			else {
				this.shiftNodeUp(node.right);
				this.shiftNodeDown(node);
			}
		}
		else if (node.left != null && node.right == null){
			if(node.priority < node.left.priority){
				this.shiftNodeUp(node.left);
				this.shiftNodeDown(node);
			}
		}
	}
}
module.exports = MaxHeap;
