class Product {
  constructor(id, name, price, image, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }
}

class Cart {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.count++;
    } else {
      this.items.push({ ...product, count: 1 });
    }
    this.totalPrice += product.price;
    this.updateCartDisplay();
    alert(`${product.name} added to cart!`);
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    this.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.count}`;
      cartItemsContainer.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `Total: $${this.totalPrice.toFixed(2)}`;
  }
}

const products = [
  new Product(1, 'ASUS ROG Strix G17 2023 17.3” QHD', 19.99, 'https://images-cdn.ubuy.co.in/67c3399a157ced505c376a68-asus-rog-strix-g17-2023-17-3-qhd.jpg', 'This is an amazing product that you will love!'),
  new Product(2, 'ASUS TUF Gaming A15', 29.99, 'https://m.media-amazon.com/images/I/61xBASwU+zL._SX679_.jpg', 'A premium product with excellent features.'),
  new Product(3, 'Acer Predator Helios 300 Gaming Laptop', 39.99, 'https://m.media-amazon.com/images/I/81g7AiqWrtL._SX679_.jpg', 'Best for everyday use, high durability and performance.'),
  new Product(4, 'Lenovo IdeaPad Gaming 3', 49.99, 'https://m.media-amazon.com/images/I/7173difaarL._SX679_.jpg', 'An innovative product that makes life easier.')
];

const cart = new Cart();

document.querySelectorAll('.add-to-cart').forEach((button, index) => {
  button.addEventListener('click', () => cart.addItem(products[index]));
});

document.getElementById('proceed-to-checkout').addEventListener('click', () => {
  alert("Proceeding to Checkout... Please wait...");
});

function changecolor() {
  const isDark = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'light') document.body.classList.add('light-theme');
}

window.onload = loadTheme;

let timer;
let timeLeft = 0;
let isRunning = false;

const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
const timerDisplay = document.getElementById("timer-display");
const inputTime = document.getElementById("input-time");

function updateTimerDisplay() {
  timerDisplay.textContent = `${String(timeLeft).padStart(2, "0")}`;
  updateBackgroundColor();
}

function updateBackgroundColor() {
  if (timeLeft > 10) {
    document.body.style.backgroundColor = "green";
  } else if (timeLeft > 5) {
    document.body.style.backgroundColor = "yellow";
  } else if (timeLeft > 0) {
    document.body.style.backgroundColor = "red";
  } else {
    document.body.style.backgroundColor = document.body.classList.contains('light-theme') ? "white" : "black";
  }
}

function startCountdown() {
  if (isRunning || isNaN(parseInt(inputTime.value))) return;
  timeLeft = parseInt(inputTime.value);
  isRunning = true;
  updateTimerDisplay();
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
    }
  }, 1000);
}

function pauseCountdown() {
  clearInterval(timer);
  isRunning = false;
}

function resetCountdown() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 0;
  updateTimerDisplay();
}

startButton.addEventListener("click", startCountdown);
pauseButton.addEventListener("click", pauseCountdown);
resetButton.addEventListener("click", resetCountdown);
