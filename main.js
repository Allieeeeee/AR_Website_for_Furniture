// Fetch and render newly added products
async function loadProducts() {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();

        // Sort by `createdAt` descending and take first 8
        const latest = products
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 8);

        const container = document.getElementById('product-list');
        container.innerHTML = '';

        latest.forEach(prod => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-3 mb-4';

            col.innerHTML = `
        <div class="card h-100">
          <img
            src="${prod.imageUrl}"
            class="card-img-top"
            alt="${prod.name}"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${prod.name}</h5>
            <p class="card-text text-muted mb-4">${prod.price}</p>
            <div class="mt-auto d-flex justify-content-between">
              <a href="/favorites/add/${prod.id}" class="text-danger">
                <i class="bi bi-heart"></i>
              </a>
              <a href="/cart/add/${prod.id}" class="text-dark">
                <i class="bi bi-cart"></i>
              </a>
            </div>
          </div>
        </div>
      `;
            container.appendChild(col);
        });
    } catch (err) {
        console.error('Failed to load products:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);
