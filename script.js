// Danh sách sản phẩm mẫu (sẽ thay bằng dữ liệu từ Supabase sau)
const products = [
  { id: 1, name: "Áo thun trắng", price: 150000 },
  { id: 2, name: "Quần jeans", price: 300000 },
  { id: 3, name: "Áo sơ mi", price: 200000 }
];

let cart = [];

function displayProducts() {
  const productContainer = document.getElementById('products');
  productContainer.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `${product.name}<br>${product.price} VND`;
    div.onclick = () => addToCart(product);
    productContainer.appendChild(div);
  });
}

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      ${item.name} - ${item.quantity} x ${item.price} VND
      <button onclick="removeFromCart(${item.id})">-</button>
    `;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  document.getElementById('total-amount').textContent = total;
}

function removeFromCart(id) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity -= 1;
    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1);
    }
    updateCart();
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Giỏ hàng trống!');
    return;
  }
  alert(`Thanh toán thành công! Tổng tiền: ${document.getElementById('total-amount').textContent} VND`);
  cart = [];
  updateCart();
}

// Hiển thị sản phẩm khi tải trang
displayProducts();
