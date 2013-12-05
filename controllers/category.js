var User = app.model('user');
var Order = app.model('order');
var Product = app.model('product');
var Category = app.model('category');

exports.getCategoryName = function(req, res){
  var category_alias = req.route.params.category_alias;
  Product.find({category_alias:category_alias}, function(err, allProducts){
    if (err) {throw err;} else{
      if (req.session.userName) {
        if (req.session.adminAuth) {
          res.render('category/index',{title: "Trang Danh Mục Sản Phẩm", allProducts:allProducts, userName:req.session.userName, adminAuth:req.session.adminAuth});
        } else{
          res.render('category/index',{title: "Trang Danh Mục Sản Phẩm", allProducts:allProducts, userName:req.session.userName});
        };
      } else{
        res.render('category/index',{title: "Trang Danh Mục Sản Phẩm", allProducts:allProducts});
      };
    };
  });
};

exports.addCategory = function(req, res){
  var new_category = new Category({
    category_name : 'Công Nghệ Điện Tử',
    category_alias : 'cong-nghe-dien-tu'
  });
  new_category.save();
  var new_category = new Category({
    category_name : 'Du Lịch',
    category_alias : 'du-lich'
  });
  new_category.save();
  var new_category = new Category({
    category_name : 'Sách Truyện',
    category_alias : 'sach-truyen'
  });
  new_category.save();
  res.send('them danh muc thanh cong');
};