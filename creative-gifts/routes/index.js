var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gift = mongoose.model('Gift');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gifts', function(req, res, next) {
  Gift.find(function(err, gifts){
    if(err){ return next(err); }

    res.json(gifts);
  });
});

router.post('/gifts', function(req, res, next) {
  var post = new Gift(req.body);

  post.save(function(err, gift){
    if(err){ return next(err); }

    res.json(gift);
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

router.get('/gifts/:gift', function(req, res) {
    res.json(req.gift);
});

module.exports = router;
