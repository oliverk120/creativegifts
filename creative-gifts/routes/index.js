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
  Gift.find(function(err, gifts){
    if(err){ return next(err); }
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
        }, function(err, bear) {
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
