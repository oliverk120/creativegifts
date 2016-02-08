var expect = require('chai').expect;
var utils = require('./utils');
var model = require('../models/Gifts');
var gifts = require('../controller/gifts');

console.log(utils);

describe('test export', function(){
	it ('should be true', function(){
		expect(gifts.test).to.be.true;
	});
});


var _title = "test gift",
	_description = "test description",
	_img_src = "http://www.imagesource.com",
	_amazonid = "B939FEU",
	_price = 10,
	_gender = "M",
	_relationship = 1,
	_nsfw = true,
	_booze = false,
	_geek = true,
	_joke = false;

var g = {title: _title,
		description: _description,
		img_src: _img_src,
		amazonid: _amazonid,
		price: _price,
		gender: _gender,
		relationship: _relationship,
		nsfw: _nsfw,
		booze: _booze,
		geek: _geek,
		joke: _joke};

describe('save gift', function(){
	it ('should create new gift', function(done){
		// Create a User object to pass to User.create()
		
		var gift = new model.Gift(g);
		gift.save(function(err, gift){
			expect(err).to.be.a('null');
			expect(gift.title).to.equal(_title);
			expect(gift.description).to.equal(_description);
			expect(gift.img_src).to.equal(_img_src);
			expect(gift.amazonid).to.equal(_amazonid);
			expect(gift.price).to.equal(_price);
			expect(gift.gender).to.equal(_gender);
			expect(gift.relationship).to.equal(_relationship);
			expect(gift.nsfw).to.equal(_nsfw);
			expect(gift.booze).to.equal(_booze);
			expect(gift.geek).to.equal(_geek);
			expect(gift.joke).to.equal(_joke);
			done();
		});
	});
});