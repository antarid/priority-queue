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
		
				if(this.parent != null){
					var parent = this.parent;
					if(parent.parent != null){
						let left = this.left;
						let right = this.right;
						
						if(parent == parent.parent.left){
							parent.parent.left = this;
						}
						else
							parent.parent.right = this;
						this.parent = parent.parent;
						parent.left = left;
						parent.right = right;
					}
					else{
						let left = this.left;
						let right = this.right;
						this.parent = null;
						if(parent.left == this){
							this.left = parent;
						
							if(parent.right != null){
								this.right = parent.right;
								this.right.parent = this;
							}
							
						}
						else{
							this.right = parent;
							if(parent.left != null){ 
								this.left = parent.left;
								this.left.parent = this;
							}
						}
						parent.left = left;
						parent.right = right;
					}
					
					parent.parent = this;
					
				}
			}
		
}

module.exports = Node;
