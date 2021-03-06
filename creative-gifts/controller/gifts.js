'use strict';

var mongoose = require('mongoose');
var Gift = mongoose.model('Gift');


exports.test = true;

exports.show = function(req, res) {
  console.log(req.gift);
	res.json(req.gift);
};

exports.save = function(req, res, next) {
	var gift = new Gift(req.body);
  gift.user = req.payload._id;
	gift.save(function(err, gift){
		if(err){ return next(err); }
		res.json(gift);
	});
};

exports.delete = function(req,res){
	console.log(req.params);
	Gift.remove({
		_id: req.params.gift
	}, function(err, gift) {
		if (err)
			res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
};

exports.find = function(req, res, next) {

	var query = {}; 
	var minprice = 0;
	var maxprice = 10000000; 

  //don't include booze, nsfw, jokes and geek gifts by default ($ne = not equals)
  query.nsfw = {$ne: true};
  query.booze = {$ne: true};
  query.joke = {$ne: true};
  query.geek = {$ne: true};

  //any level of relationship is default
  

  //automatically include romantic/meaningful gifts by not specifying
  console.log(req.query);

  if('relationship' in req.query){
  	var relationship = req.query.relationship.split("");
  	if(relationship.indexOf('0')>-1){
      //if relationship 0 is selected, this means all gifts, even those that don't have the relationship field should be included
      query.$or = [{relationship: {$in: relationship}}, {relationship: {$exists: false}}];
  } else {
  	query.relationship = {$in: relationship};
  }
}

  //if nsfw, joke, geek or booze gifts are specifically included, add them to the query
  if('nsfw' in req.query){
  	if(req.query.nsfw == 'true'){
      //if nsfw is set to true, don't filter out any nsfw results i.e. include everything
      delete query.nsfw;
  } else { 
      //if it's not true, don't include any gifts with nsfw set to true
      query.nsfw = {$ne: true};
  };
}

if('geek' in req.query){
	if(req.query.geek == 'true'){
      //if geek is set to true, don't filter out any geek results i.e. include everything
      delete query.geek;
  } else { 
      //if it's not true, don't include any gifts with geek set to true
      query.geek = {$ne: true};
  };
}

if('joke' in req.query){
	if(req.query.joke == 'true'){
      //if joke is set to true, don't filter out any joke results i.e. include everything
      delete query.joke;
  } else { 
      //if it's not true, don't include any gifts with joke set to true
      query.joke = {$ne: true};
  };
}

if('booze' in req.query){
	if(req.query.booze == 'true'){
      //if booze is set to true, don't filter out any booze results i.e. include everything
      delete query.booze;
  } else { 
      //if it's not true, don't include any gifts with booze set to true
      query.booze = {$ne: true};
  };
}


  //if a gender was specified, add it to the query
  if('gender' in req.query){
  	if(req.query.gender == "M"){
      //if gender set to male, don't include female gifts
      query.gender = {$ne: "F"};
  } else if (req.query.gender == "F"){
      //if gender set to female, don't include male gifts
      query.gender = {$ne: "M"};
  }
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

};