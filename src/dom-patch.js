// dom-patch.js
if (typeof window !== 'undefined') {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    try {
      return originalRemoveChild.call(this, child);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return child; // Trả về child để tránh crash
      }
      throw error;
    }
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    try {
      return originalInsertBefore.call(this, newNode, referenceNode);
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return this.appendChild(newNode); // Fallback append
      }
      throw error;
    }
  };
}