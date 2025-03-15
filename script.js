// script.js
let products = [];
let orders = [];
let totalRevenue = 0;

document.getElementById('add-product-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('product-name').value;
  const price = parseInt(document.getElementById('product-price').value);
  const quantity = parseInt(document.getElementById('product-quantity').value);

  const product = { name, price, quantity };
  products.push(product);
  updateProductList();
  updateOrderProductDropdown();

  this.reset();
});

function updateProductList() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ${product.price} VND (Còn: ${product.quantity})`;
    list.appendChild(li);
  });
}

function updateOrderProductDropdown() {
  const select = document.getElementById('order-product');
  select.innerHTML = '';
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    select.appendChild(option);
  });
}

function addToOrder() {
  const productName = document.getElementById('order-product').value;
  const quantity = parseInt(document.getElementById('order-quantity').value);
  const product = products.find(p => p.name === productName);

  if (product && product.quantity >= quantity) {
    orders.push({ name: productName, price: product.price, quantity });
    product.quantity -= quantity;
    updateProductList();
    updateOrderList();
  } else {
    alert('Số lượng không đủ!');
  }
}

function updateOrderList() {
  const list = document.getElementById('order-list');
  list.innerHTML = '';
  orders.forEach(order => {
    const li = document.createElement('li');
    li.textContent = `${order.name} - ${order.quantity} x ${order.price} VND`;
    list.appendChild(li);
  });
}

function checkout() {
  let total = 0;
  orders.forEach(order => {
    total += order.price * order.quantity;
  });
  totalRevenue += total;
  document.getElementById('total-revenue').textContent = totalRevenue;
  orders = [];
  updateOrderList();
  alert(`Thanh toán thành công! Tổng tiền: ${total} VND`);
}

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
}
