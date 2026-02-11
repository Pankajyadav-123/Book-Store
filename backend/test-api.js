import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test colors
const colors = {
  reset: '\x1b[0m',
  pass: '\x1b[32m',
  fail: '\x1b[31m',
  info: '\x1b[36m',
  warn: '\x1b[33m'
};

const test = (name) => console.log(`\n${colors.info}Testing: ${name}${colors.reset}`);
const pass = (msg) => console.log(`${colors.pass}✓ ${msg}${colors.reset}`);
const fail = (msg) => console.log(`${colors.fail}✗ ${msg}${colors.reset}`);

let token = '';
let userId = '';
let bookId = '';

const tests = {
  async testSignup() {
    test('User Signup');
    try {
      const res = await axios.post(`${BASE_URL}/user/signup`, {
        name: 'Test User',
        email: 'testuser' + Date.now() + '@test.com',
        password: 'password123'
      });
      
      if (res.data.success) {
        pass('Signup successful');
        token = res.data.token;
        userId = res.data.userId;
        if (token) pass(`Token received: ${token.substring(0, 20)}...`);
        if (userId) pass(`User ID: ${userId}`);
        return res.data;
      } else {
        fail(`Signup failed: ${res.data.message}`);
        return null;
      }
    } catch (err) {
      fail(`Signup error: ${err.response?.data?.message || err.message || JSON.stringify(err)}`);
      console.error('Full error:', err.toJSON ? err.toJSON() : err);
      return null;
    }
  },

  async testLogin() {
    test('User Login');
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, {
        email: 'pankaj@gmail.com',
        password: 'pankaj123'
      });
      
      if (res.data.success) {
        pass('Login successful');
        token = res.data.token;
        userId = res.data.userId;
        pass(`Token received: ${token.substring(0, 20)}...`);
        pass(`User ID: ${userId}`);
        return res.data;
      } else {
        fail(`Login failed: ${res.data.message}`);
        return null;
      }
    } catch (err) {
      fail(`Login error: ${err.response?.data?.message || err.message}`);
      return null;
    }
  },

  async testGetBooks() {
    test('Get Books List');
    try {
      const res = await axios.get(`${BASE_URL}/book/list`);
      
      if (res.data.success) {
        const books = res.data.books || res.data.Books || [];
        pass(`Found ${books.length} books`);
        if (books.length > 0) {
          bookId = books[0]._id;
          pass(`Sample book ID: ${bookId}`);
        }
        return books;
      } else {
        fail(`Get books failed: ${res.data.message}`);
        return [];
      }
    } catch (err) {
      fail(`Get books error: ${err.message}`);
      return [];
    }
  },

  async testAddToCart() {
    test('Add to Cart');
    if (!token || !bookId) {
      fail('Skipped: No token or book ID');
      return null;
    }
    
    try {
      const res = await axios.post(`${BASE_URL}/cart/add`, 
        { itemId: bookId },
        { headers: { token } }
      );
      
      if (res.data.success) {
        pass(`Item added to cart: ${JSON.stringify(res.data.cartData)}`);
        return res.data;
      } else {
        fail(`Add to cart failed: ${res.data.message}`);
        return null;
      }
    } catch (err) {
      fail(`Add to cart error: ${err.response?.data?.message || err.message}`);
      return null;
    }
  },

  async testGetCart() {
    test('Get Cart Data');
    if (!token) {
      fail('Skipped: No token');
      return null;
    }
    
    try {
      const res = await axios.post(`${BASE_URL}/cart/get`, 
        {},
        { headers: { token } }
      );
      
      if (res.data.success) {
        pass(`Cart retrieved: ${JSON.stringify(res.data.cartData)}`);
        return res.data.cartData;
      } else {
        fail(`Get cart failed: ${res.data.message}`);
        return null;
      }
    } catch (err) {
      fail(`Get cart error: ${err.response?.data?.message || err.message}`);
      return null;
    }
  },

  async testUpdateCart() {
    test('Update Cart Quantity');
    if (!token || !bookId) {
      fail('Skipped: No token or book ID');
      return null;
    }
    
    try {
      const res = await axios.post(`${BASE_URL}/cart/update`, 
        { itemId: bookId, quantity: 5 },
        { headers: { token } }
      );
      
      if (res.data.success) {
        pass(`Cart updated: ${res.data.message}`);
        return res.data;
      } else {
        fail(`Update cart failed: ${res.data.message}`);
        return null;
      }
    } catch (err) {
      fail(`Update cart error: ${err.response?.data?.message || err.message}`);
      return null;
    }
  },

  async testPlaceOrder() {
    test('Place Order (COD)');
    if (!token || !userId) {
      fail('Skipped: No token or user ID');
      return null;
    }
    
    try {
      const res = await axios.post(`${BASE_URL}/order/place`, 
        {
          userId,
          items: [{ _id: bookId, price: 100, quantity: 2, name: 'Test Book' }],
          amount: 200,
          address: 'Test Address'
        },
        { headers: { token } }
      );
      
      if (res.data.success) {
        pass(`Order placed: ${res.data.message}`);
        return res.data;
      } else {
        fail(`Place order failed: ${res.data.message}`);
        return null;
      }
    } catch (err) {
      fail(`Place order error: ${err.response?.data?.message || err.message}`);
      return null;
    }
  },

  async testGetUserOrders() {
    test('Get User Orders');
    if (!token) {
      fail('Skipped: No token');
      return null;
    }
    
    try {
      const res = await axios.post(`${BASE_URL}/order/userorders`, 
        {},
        { headers: { token } }
      );
      
      if (res.data.success) {
        pass(`User orders retrieved: ${res.data.orders.length} orders`);
        return res.data.orders;
      } else {
        fail(`Get user orders failed: ${res.data.message}`);
        return null;
      }
    } catch (err) {
      fail(`Get user orders error: ${err.response?.data?.message || err.message}`);
      return null;
    }
  }
};

async function runTests() {
  console.log(`\n${colors.info}========== BOOKSHOP API TEST SUITE ==========${colors.reset}\n`);
  
  // First create a new user
  const signupResult = await tests.testSignup();
  
  if (signupResult && signupResult.token) {
    token = signupResult.token;
    userId = signupResult.userId;
    pass(`Using token from signup`);
  } else {
    // Try to login with existing credentials
    await tests.testLogin();
  }
  
  // Then run other tests
  await tests.testGetBooks();
  if (token) {
    await tests.testAddToCart();
    await tests.testGetCart();
    await tests.testUpdateCart();
    await tests.testPlaceOrder();
    await tests.testGetUserOrders();
  }

  console.log(`\n${colors.info}========== TEST SUITE COMPLETE ==========${colors.reset}\n`);
  process.exit(0);
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
