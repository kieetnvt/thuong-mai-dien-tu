
/*
 * GET home page.
 */
// var product = require('../controllers/product');

// var all_product = product.get_product;
var Product = app.model('product');
var Solr = require('solr-client');
// for ubuntu
// var client = Solr.createClient("localhost",8080,"core1","/apache-solr-3.6.2/");
// for window test
var client = Solr.createClient("localhost",8080,"collection1","/solr/#/~cores");
console.log(client)
client.autoCommit = true;

exports.index = function(req, res){
  res.redirect('/san-pham');
};

exports.indexData = function(req, res){
  // var docs = [];
  // Product.find({}, function(err, data){
  //   for(var i = 0; i < data.length ; i++){
  //     docs.push(data[i]);
  //   };
  //   client.add(docs, function(err,obj){
  //     if(err){
  //     console.log(err);
  //     }else{
  //     console.log(obj);
  //     };
  //   });
  // });
  // res.send("index Data is Done!");
  var mixs = [
                {phone:"016855xxxx"},
                {phone:"01686xxxxx"},
            ];
  client.add(mixs, function(err, obj){
    if (err) {throw err;} else{
      res.send("aaa");
    };
  });
};

exports.search = function(req, res){
  console.log("client search : " + req.body.q);
  var query = req.body.q;
  var query2 = client.createQuery()
             .q({name : query})
             .start(0)
             .rows(10);
  client.search(query2,function(err,obj){
     if(err){
      console.log(err);
     }else{
      console.log(obj.response.docs);
      if (req.session.userName) {
        res.render('index/search-result',{
          title:"Trang Ket Qua Tim Kiem",
          userName:req.session.userName,
          adminAuth:req.session.adminAuth,
          allProducts:obj.response.docs,
          query:query
        });
      } else{
        res.render('index/search-result',{
          title:"Trang Ket Qua Tim Kiem",
          allProducts:obj.response.docs,
          query:query
        });
      };
     };
  });
};
