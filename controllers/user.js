
/**********************************************************************************
 ***************************** Users Controller ***********************************
 **********************************************************************************/


var User = app.model('user');
var Order = app.model('order');
var Product = app.model('product');
var Category = app.model('category');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.showLogIn = function(req, res){
  res.render('user/log-in', { title: 'Trang đăng nhập'});
};

exports.logOut = function(req, res){
  req.session.destroy(function(){
    console.log('session destroy~!')
    res.redirect('/');
  });
};

exports.logIn = function(req, res){
  var userName = req.body['user-name'];
  var userPassword = req.body['user-password'];
  console.log("Log In :"+userName + ":" + userPassword);
  if (userName =="admin" && userPassword == "thuongmaidientu") {
      req.session.regenerate(function(){
      req.session.userName = userName;
      req.session.adminAuth = true;
      console.log("session " + req.session.userName);
      res.redirect('/admin/quan-ly-san-pham');
    });
  } else{
    User.find({
      $and: [{user_name:userName},{user_password:userPassword}]
    }, function(err, result){
      console.log(result);
      if (err) { throw err;} else {
        if (result != "") {
          console.log('Login Successfully!');
          req.session.regenerate(function(){
          req.session.userName = userName;
          req.session.adminAuth = false;
          console.log("session " + req.session.userName);
          res.redirect('/');
        });
        } else{
          console.log('Login Failed!');
          res.redirect('/dang-nhap');
        };
      };
    });
  };
};

exports.showSignUp = function(req, res){
  res.render('user/sign-up', {title: 'Trang đăng ký thành viên'});
}

exports.signUp = function(req, res){
  var userName = req.body['user-name'];
  var userPassword  = req.body['user-password'];
  var userPassword2 = req.body['user-password2'];
  console.log(userName + ":" + userPassword + ":" + userPassword2);
  if (userPassword != userPassword2) {
    console.log('userPassword != userPassword2');
    res.render('user/sign-up', {
      title:'Sign In Page',
      info: "Not Match"
    });
  } else{
    console.log('userPassword === userPassword2');
    var newUser = User({
      user_name: userName,
      user_password: userPassword
    });
    newUser.save();
    console.log('Created new user ' + newUser);
    res.render('user/log-in', {title:'Trang đăng nhập'});
  };
}

/**********************************************************************************
 ***************************** Work With Cart Order *******************************
 **********************************************************************************/

// show list order in your cart
exports.cartOrder = function(req, res){
  if (req.session.userName) {
    console.log("user dang dat hang : " + req.session.userName);
    Order.find({$and: [
      {_user_name:req.session.userName},
      {_submit_buy:false}]}, function(err, orders){
      // var arr = [];
      var arrNumber = [];
      var arrProducts = [];
      if (orders.length > 0) {
        for (var i = 0; i < orders.length ; i++) {
          arrNumber.push(orders[i]._number);
          Product.findById(orders[i]._products_id, function(err, result){
            arrProducts.push(result);
            if (arrProducts.length == orders.length) {
              res.render('user/your-cart',{
                title:'Trang Gio Hang',
                orders:orders,
                arrProducts:arrProducts,
                arrNumber:arrNumber,
                userName:req.session.userName
              });
            };
          });
        };
      } else{
        res.render('user/your-cart',{
          title:'Trang Gio Hang',
          arrProducts:[],
          arrNumber:[],
          orders:orders,
          userName:req.session.userName
        })
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

// adding order to your cart
exports.addToCart = function(req, res){
  if (req.session.userName) {
    Product.findById(req.body.productId, function(err, data){
      if (data.expire == false) {
        var new_order = new Order({
          _user_name : req.session.userName,
          _products_id : data.id,
          _number : req.body.number,
          _submit_buy : false
        });
        new_order.save();
        console.log('tao thanh cong 1 order');
        var message = "Đặt Hàng Thành Công, Hãy Kiểm Tra Giỏ Hàng."
        res.send(message);
      } else{
        var message = "Sản Phẩm Đã Hết Hạn Mua."
        res.send(message);
        console.log('san pham da expired');
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.deleteOrder = function(req, res){
  if (req.session.userName) {
    console.log("user dang xoa order cart");
    Order
    .remove({_id:req.body.orderId})
    .exec(function(err){
      console.log("delete done!");
    });
  } else{
    res.redirect('/dang-nhap')
  };
};

// buy one product now - create the order of product - change boolean - and payment
exports.buyProductNow = function(req, res){
  if (req.session.userName) {
    console.log('mua ngay san pham nay');
    Product.findById(req.body.productId, function(err, data){
      if (data.expire == false) {
        data.man_buy += 1;
        data.save();
        var new_order = new Order({
          _user_name : req.session.userName,
          _products_id : data.id,
          _number : req.body.number,
          _submit_buy: true
        });
        new_order.save();
        console.log('tao thanh cong 1 order mua ngay');
        var message = "YES";
        res.send(message);
      } else{
        console.log('san pham mua ngay da het han!!');
        var message = "NO";
        res.send(message);
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.paymentMethodAllOrder = function(req, res){
  if (req.session.userName) {
    Order.find({$and:[{_user_name:req.session.userName},{_user_confirm:false}]}, function(err, orders){
      var arrNumber = [];
      var arrProducts = [];
      if (orders.length > 0) {
        for (var i = 0; i < orders.length ; i++) {
          //update submit buy for order = true
          if (orders[i]._submit_buy == false) {
            orders[i]._submit_buy = true;
            orders[i].save();
          };
          arrNumber.push(orders[i]._number);
          Product.findById(orders[i]._products_id, function(err, result){
            arrProducts.push(result);
            if (arrProducts.length == orders.length) {
              res.render('user/payment-method',{
                title:'Trang Gio Hang',
                orders:orders,
                arrProducts:arrProducts,
                arrNumber:arrNumber,
                userName:req.session.userName
              });
            };
          });
        };
      } else{
        res.render('user/payment-method',{
          title:'Trang Gio Hang',
          arrProducts:[],
          arrNumber:[],
          orders:orders,
          userName:req.session.userName
        })
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};
// function in use for method payment now
exports.submitForPaymentOrder = function(req, res){
  if (req.session.userName) {
    var userName = req.body.userName;
    var userPassword = req.body.userPassword;
    var payment = req.body.paymentMethod;
    var userAccountNumber = req.body.userAccountNumber;
    console.log("payment " + payment + " account number " + userAccountNumber);
    console.log(">>>>>>>>>>>" + userName);
    User.find({$and:[{user_name:req.session.userName},{user_password:userPassword}]}, function(err, user){
      if (user != "") {
        console.log(">>>>>>>>>>>>> user right!");
        Order.find({$and:[{_user_name:userName},{_submit_buy:true}]}, function(err, orders){
          if (orders.length > 0) {
            for (var i = 0; i < orders.length ; i++){
              orders[i]._user_confirm = true;
              orders[i]._payment_method = payment;
              if (payment == "1" || payment == "2") {
                orders[i]._account_number = userAccountNumber;
              } else {
                orders[i]._account_number = "no set";
              };
              orders[i].save();
            };
          };
        });
        res.render('user/confirm-success', {
          title: "Confirm Successfully",
          userName: req.session.userName
        });
      } else{
        res.render('layouts/error', {title:"Error Page"});
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.paymentMethod = function(req, res){
  if (req.session.userName) {
    Order.find({
      $and: [
      {_user_name:req.session.userName},
      {_submit_buy:true}]
    }, function(err, orders){
      var arrNumber = [];
      var arrProducts = [];
      if (orders.length > 0) {
        for (var i = 0; i < orders.length ; i++) {
          arrNumber.push(orders[i]._number);
          Product.findById(orders[i]._products_id, function(err, result){
            arrProducts.push(result);
            if (arrProducts.length == orders.length) {
              res.render('user/payment-method',{
                title:'Trang Gio Hang',
                arrProducts:arrProducts,
                arrNumber:arrNumber,
                userName:req.session.userName
              });
            };
          });
        };
      } else{
        res.render('user/payment-method',{
          title:'Trang Gio Hang',
          arrProducts:[],
          arrNumber:[],
          userName:req.session.userName
        })
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.showOrderConfirmed = function(req, res){
  if (req.session.userName) {
    Order.find({$and:[{_user_name:req.session.userName},{_user_confirm:true},{_submit_buy:true}]}, function(err, orders){
      var arrNumber = [];
      var arrProducts = [];
      if (orders.length > 0) {
        for (var i = 0; i < orders.length ; i++) {
          arrNumber.push(orders[i]._number);
          Product.findById(orders[i]._products_id, function(err, result){
            arrProducts.push(result);
            if (arrProducts.length == orders.length) {
              res.render('user/order-confirmed',{
                title:'Trang Gio Hang',
                arrProducts:arrProducts,
                arrNumber:arrNumber,
                userName:req.session.userName
              });
            };
          });
        };
      } else{
        res.render('user/order-confirmed',{
          title:'Trang Gio Hang',
          arrProducts:[],
          arrNumber:[],
          userName:req.session.userName
        })
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};