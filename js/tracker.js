// Page view tracker using localStorage
const ViewTracker = {
  STORAGE_KEY: 'viewed_products',

  // Get all viewed products
  getViewed() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Add a product to viewed list
  addViewed(product) {
    const viewed = this.getViewed();
    // Check if already exists
    if (!viewed.find(p => p.id === product.id)) {
      viewed.push({
        id: product.id,
        name: product.name,
        viewedAt: new Date().toISOString()
      });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(viewed));
    }
  },

  // Clear all history
  clearHistory() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  // Get count of viewed products
  getCount() {
    return this.getViewed().length;
  }
};

// Update badge count in header
function updateBadge() {
  const badge = document.getElementById('history-count');
  if (badge) {
    const count = ViewTracker.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline' : 'none';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateBadge);
