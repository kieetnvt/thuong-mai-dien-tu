var User = app.model('user');
var Order = app.model('order');
var Product = app.model('product');
var Category = app.model('category');
var dateNow1 = new Date();
var dateNow2 = new Date();

// The main Page Get All Products
exports.getProducts = function(req, res){
    Product.find({}).sort({price:1}).exec(function(err, allProducts){
      if (req.session.userName) {
        Order.find({$and:[{_user_name:req.session.userName},{_submit_buy:false}]}, function(err, orders){
          console.log(req.session.userName)
          res.render('index/index',{
            title: 'Trang Chủ',
            allProducts: allProducts,
            userName: req.session.userName,
            adminAuth: req.session.adminAuth,
            orders:orders
          });
        });
      } else {
        res.render('index/index',{
          title:'Trang Chủ',
          allProducts:allProducts
        });
      };
  });
};

exports.getProductDetail = function(req, res){
  var productId = req.route.params.product_id;
  console.log(productId);
  Product.findById(productId, function(err, productDetail){
    if (err) {throw err;} else{
      if (req.session.userName) {
        res.render('product/product-detail',{
          title: 'Trang Thông Tin Sản Phẩm',
          productDetail: productDetail,
          userName: req.session.userName,
          adminAuth: req.session.adminAuth
        });
      } else{
        res.render('product/product-detail',{
          title: 'Trang Thông Tin Sản Phẩm',
          productDetail: productDetail
        });
      };
    };
  });
};

exports.setExpire = function(req, res){
  var product_id = req.body.product_id;
  Product.findById(product_id, function(err, data){
    if (err) {throw err;} else{
      data.expire = true;
      data.save();
    };
  });
  res.redirect('/san-pham');
};

exports.setNotExpire = function(req, res){
  var product_id = req.body.product_id;
  Product.findById(product_id, function(err, data){
    if (err) {throw err;} else{
      data.expire = false;
      data.save();
    };
  });
  res.redirect('/san-pham');
}

exports.addProducts = function(req, res){
  if(req.session.adminAuth){
    var newProduct = new Product({
      name:'USB 8Gb Sony Vaio Inox',
      category_alias:'cong-nghe-dien-tu',
      price:130000,
      img:'http://images.hotdeals.vn/images/detailed/264/31158-0-square.jpg',
      detail:'USB 8Gb Sony Vaio Inox',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Bao Da Samsung Galaxy S3',
      category_alias:'cong-nghe-dien-tu',
      price:130000,
      img:'http://images.hotdeals.vn/images/detailed/264/42240_0_square_baodasamsungs3_1.jpg',
      detail:'Bao Da Samsung Galaxy S3',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Bao Da iPad 2/3/4',
      category_alias:'cong-nghe-dien-tu',
      price:130000,
      img:'http://images.hotdeals.vn/images/detailed/261/41556-0-square.jpg',
      detail:'Bao Da iPad 2/3/4',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Loa Nghe Nhạc Nansin',
      category_alias:'cong-nghe-dien-tu',
      price:130000,
      img:'http://images.hotdeals.vn/images/detailed/264/44679_0_square_1.jpg',
      detail:'Loa Nghe Nhạc Nansin',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Long Beach Resort 3N2Đ+Đưa Đón Sân Bay',
      category_alias:'du-lich',
      price:4990000,
      img:'http://images.hotdeals.vn/images/detailed/265/45132_feature_new.jpg',
      detail:'Loa Nghe Nhạc Nansin',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Tour DL Nghỉ Đêm Mũi Né + Thưởng Thức Hải Sản 2N1Đ',
      category_alias:'du-lich',
      price:1250000,
      img:'http://images.hotdeals.vn/images/detailed/262/43271_square.jpg',
      detail:'Tour DL Nghỉ Đêm Mũi Né + Thưởng Thức Hải Sản 2N1Đ',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Tour Quần Đảo Bà Lụa – Hang Moso, Hang Song',
      category_alias:'du-lich',
      price:1099000,
      img:'http://images.hotdeals.vn/images/detailed/253/41623_0_square_tourkhamphaquandaobalua_1.jpg',
      detail:'Tour Quần Đảo Bà Lụa – Hang Moso, Hang Song',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Khách Sạn Monaco Đà Nẵng Không Phụ Thu Cuối Tuần',
      category_alias:'du-lich',
      price:349000,
      img:'http://images.hotdeals.vn/images/detailed/257/42618_0_square.jpg',
      detail:'Khách Sạn Monaco Đà Nẵng Không Phụ Thu Cuối Tuần',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Sách ‘Mười Điều Tôi Học Được Về Tình Yêu’',
      category_alias:'sach-truyen',
      price:84000,
      img:'http://images.hotdeals.vn/images/detailed/266/45083_0_feature_1.jpg',
      detail:'Sách ‘Mười Điều Tôi Học Được Về Tình Yêu’',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Sách “Cách Tân Để Thắng”',
      category_alias:'sach-truyen',
      price:184000,
      img:'http://images.hotdeals.vn/images/detailed/256/41270_0_square.jpg',
      detail:'Sách “Cách Tân Để Thắng”',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Bộ 2 Tập Tiểu Thuyết ‘Hoa Thiên Cốt’',
      category_alias:'sach-truyen',
      price:210000,
      img:'http://images.hotdeals.vn/images/detailed/269/45089_0_feature.jpg',
      detail:'Bộ 2 Tập Tiểu Thuyết ‘Hoa Thiên Cốt’',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
    newProduct.save();
    var newProduct = new Product({
      name:'Sách “Gian Truân Chỉ Là Thử Thách”',
      category_alias:'sach-truyen',
      price:284000,
      img:'http://images.hotdeals.vn/images/detailed/251/41255-0-feature.jpg',
      detail:'Sách “Gian Truân Chỉ Là Thử Thách”',
      man_buy: 32,
      time_to_buy: dateNow1.setDate(dateNow2.getDate()+1)//adding 5 day in future
    });
  };
  newProduct.save();
  res.redirect('/');
};