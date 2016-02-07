var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Gift = mongoose.model('Gift');
var gifts = require('../controller/gifts');


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
.get(gifts.find)
.post(gifts.save);


router.route('/gifts/:gift')
.get(gifts.show)
.delete(gifts.delete);

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
