var User = app.model('user');
var Order = app.model('order');
var Product = app.model('product');
var Category = app.model('category');

exports.managerProduct = function(req, res){
  if (req.session.adminAuth) {
    Product.find({}).sort({price:1}).exec(function(err, allProducts){
      res.render('admin/manager-product', {
        title:'Admin Page',
        allProducts:allProducts,
        userName:req.session.userName,
        adminAuth: req.session.adminAuth
      });
    });
  } else{
     res.redirect('/dang-nhap');
  };
};

exports.productEdit = function(req, res){
  if (req.session.adminAuth) {
    var id = req.route.params.product_id;
    Product.findById(id, function(err, result){
      if (err) {throw err} else{
        res.render('admin/edit-san-pham',{
          title:'Admit Edit Product',
          result: result,
          adminAuth: req.session.adminAuth,
          userName: req.session.userName
        });
      };
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.showAddProduct = function(req, res){
  if (req.session.adminAuth) {
    res.render('admin/add-product', {
      title:'Trang Them San Pham',
      userName: req.session.userName,
      adminAuth: req.session.adminAuth
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.addProduct = function(req, res){
  if (req.session.adminAuth) {
    var new_product = new Product({
      name: req.body.name,
      price: req.body.price,
      detail: req.body.detail,
      img: req.body.image,
      detail_1: req.body.detail_1,
      detail_2: req.body.detail_2,
      detail_summary: req.body.detail_summary,
      category_alias: req.body.category_alias,
      time_to_buy: req.body.time_to_buy,
      man_buy: req.body.man_buy
    });
    new_product.save();
    res.redirect('/admin/quan-ly-san-pham');
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.postEditProduct = function(req, res){
  if (req.session.adminAuth) {
    var id = req.route.params.product_id;
    Product.findById(id, function(err, result){
      result.name = req.body.name;
      result.price = req.body.price;
      result.detail = req.body.detail;
      result.img = req.body.image;
      result.detail_1 = req.body.detail_1;
      result.detail_2 = req.body.detail_2;
      result.detail_summary = req.body.detail_summary;
      result.category_alias = req.body.category_alias;
      result.time_to_buy = req.body.time_to_buy;
      result.man_buy = req.body.man_buy;
      result.expire = false;
      result.save();
      res.redirect('/admin/quan-ly-san-pham');
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.postDeleteProduct = function(req, res){
  if (req.session.adminAuth) {
    console.log('admin xoa san pham');
    Product.remove({_id:req.body.productId}).exec(function(err){
      if(!err){
        console.log('xoa thanh cong!');
      }
      else {
        console.log('xoa error!');
      };
    });
    res.redirect('/admin/quan-ly-san-pham');
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.managerUser = function(req, res){
  if (req.session.adminAuth) {
    User.find({}).sort({user_name:1}).exec(function(err, allUsers){
        res.render('admin/manager-user', {
          title:'Manager User Page',
          allUsers:allUsers,
          userName:req.session.userName,
          adminAuth: req.session.adminAuth
      });
    });
  } else{
    res.redirect('/dang-nhap');
  };
};

exports.managerOrder = function(req, res){
  Order.find({$and:[{_submit_buy:true},{_user_confirm:true}]}).sort({_user_name:1}).exec(function(err, allOrders){
      var arrNumber = [];
      var arrProducts = [];
      console.log(req.session.adminAuth);
      if (req.session.adminAuth) {
        if (allOrders.length > 0) {
          for (var i = 0; i < allOrders.length ; i++) {
            arrNumber.push(allOrders[i]._number);
            Product.findById(allOrders[i]._products_id, function(err, result){
              arrProducts.push(result);
              if (arrProducts.length == allOrders.length) {
                res.render('admin/manager-order',{
                  title:'Trang Admin manager-order',
                  allOrders:allOrders,
                  arrProducts:arrProducts,
                  arrNumber:arrNumber,
                  userName:req.session.userName,
                  adminAuth:req.session.adminAuth
                });
              };
            });
          };
        } else{
                res.render('admin/manager-order',{
                  title:'Trang Admin manager-order',
                  allOrders:allOrders,
                  arrProducts:arrProducts,
                  arrNumber:arrNumber,
                  userName:req.session.userName,
                  adminAuth:req.session.adminAuth
                });
        };
      } else{
        res.redirect('/dang-nhap');
      };
  });
};

exports.deleteOrder = function(req, res){
  if (req.session.adminAuth) {
    console.log("admin dang xoa order cart");
    Order.remove({_id:req.body.productId}).exec(function(err){
      console.log("delete done!");
    });
    res.redirect('/admin/quan-ly-don-hang');
  } else{
    res.redirect('/dang-nhap')
  };
};

exports.deleteUser = function(req, res){
  if (req.session.adminAuth) {
    console.log('xoa user');
    User.remove({_id:req.body.userId}).exec(function(err){
      if (err) {throw err;} else{
        res.redirect('/admin/quan-ly-nguoi-dung');
      };
    })
  } else{
    res.redirect('/dang-nhap');
  };
};