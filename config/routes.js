var app = global.app;

var BaseRoutes = require('../lib/app/base-routes.js');
var Routes = new BaseRoutes();

with(Routes) {
  // Main Page Routes
  get('/', 'index#index');
  post('/tim-kiem', 'index#search');
  get('/index-data', 'index#indexData');

  // Account Routes
  get('/dang-nhap', 'user#showLogIn');
  get('/dang-ky', 'user#showSignUp');
  get('/dang-xuat', 'user#logOut');
  get('/thanh-vien', 'user#list');
  get('/dat-hang', 'user#cartOrder');
  get('/da-mua','user#showOrderConfirmed');
  get('/thanh-toan', 'user#paymentMethodAllOrder');
  post('/confirm-payment-order', 'user#submitForPaymentOrder');

  post('/mua-ngay', 'user#buyProductNow');
  post('/dang-ky', 'user#signUp');
  post('/dang-nhap', 'user#logIn');
  post('/them-vao-gio', 'user#addToCart');
  post('/xoa-order', 'user#deleteOrder');

  // Products Routes
  get('/them-san-pham', 'product#addProducts');
  get('/san-pham', 'product#getProducts');
  get('/san-pham/:product_id', 'product#getProductDetail');
  post('/set-expire','product#setExpire');
  post('/set-not-expire','product#setNotExpire');

  // Categories Routes
  get('/category/:category_alias', 'category#getCategoryName');
  get('/them-danh-muc', 'category#addCategory');

  // Admin Routes
  get('/admin/quan-ly-san-pham', 'admin#managerProduct');
  get('/admin/quan-ly-order', 'admin#managerOrder');
  get('/admin/edit-san-pham/:product_id', 'admin#productEdit');
  get('/admin/them-san-pham','admin#showAddProduct');
  get('/admin/quan-ly-don-hang', 'admin#managerOrder');
  get('/admin/quan-ly-nguoi-dung', 'admin#managerUser');
  get('/admin/order-chi-tiet/:order_id','admin#showOrderDetail');
  get('/admin/order-edit','admin#showEditOrder');

  post('/admin/post-add-product', 'admin#addProduct');
  post('/admin/post-edit-product/:product_id', 'admin#postEditProduct');
  post('/admin/xoa-san-pham', 'admin#postDeleteProduct');
  post('/admin/xoa-order','admin#deleteOrder');
  post('/admin/xoa-user','admin#deleteUser');
  // Index
  get('/home/aboutus','index#aboutus');
  get('/home/privacy','index#privacy');
}

exports = module.exports = Routes;