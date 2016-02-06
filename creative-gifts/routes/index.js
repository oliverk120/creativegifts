var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gift = mongoose.model('Gift');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/gifts')
.get(function(req, res, next) {

  var query = {}; 
  var minprice = 0;
  var maxprice = 10000000; 

  //don't include booze, nsfw, jokes and geek gifts by default
  query.nsfw = {$ne: true};
  //query.booze = false;
  //query.joke = false;
  //query.geek = false;

  //automatically include romantic/meaningful gifts by not specifying
  console.log(req.query);
  //if nsfw, joke, geek or booze gifts are specifically included, add them to the query
  if('nsfw' in req.query){
    if(req.query.nsfw == 'true'){
      //if nsfw is set to true, don't filter out any nsfw results i.e. include everything
      delete query.nsfw;
    } else { 
      query.nsfw = {$ne: true};
    };
  }


  //if a gender was specified, add it to the query
  if('gender' in req.query){
    query.$or = [{gender:req.query.gender}, {gender:{$exists:false}}];
  }

  if('minprice' in req.query){
  //if a minprice is set, replace placeholder
    minprice = req.query.minprice;
  }

  if('maxprice' in req.query){
  //if a maxprice is set, replace placeholder
    maxprice = req.query.maxprice;
  }
  query.price = {$gt: minprice, $lt: maxprice};
  console.log(query);

  Gift.find(query).sort('-created').exec(function(err, gifts) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the gifts'
      });
    }
    res.json(gifts);
  });

})
.post(function(req, res, next) {
  var gift = new Gift(req.body);
  gift.save(function(err, gift){
    if(err){ return next(err); }
    res.json(gift);
  });
});


router.route('/gifts/:gift')
.get(function(req, res) {
    res.json(req.gift);
})
.delete(function(req,res){
  console.log(req.params);
  Gift.remove({
            _id: req.params.gift
        }, function(err, gift) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
});

router.param('gift', function(req, res, next, id) {
  var query = Gift.findById(id);

  query.exec(function (err, gift){
    if (err) { return next(err); }
    if (!gift) { return next(new Error('can\'t find gift')); }

    req.gift = gift;
    return next();
  });
});

module.exports = router;

//Router Func
