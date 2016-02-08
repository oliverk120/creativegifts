var expect = require('chai').expect;
var utils = require('./utils');
var model = require('../models/Gifts');
var gifts = require('../controller/gifts');

console.log(utils);

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


describe('creating and deleting gifts', function(){
	describe('save gift', function(){
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
		var gift = new model.Gift(g);
		it ('should save a new gift without issues', function(done){
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
			//id is a mongodb object
			expect(gift._id).to.be.an('object');
			//created is a mongodb date
			expect(gift.created).to.be.ok;
			done();
		});
		});
		it('should not save gift if title is blank', function(){
			gift.title = "";
			gift.save(function(err, gift){
				expect(err).to.not.be(undefined);
				done();
			});
		});
		afterEach(function(done) {
			gift.remove(function () {
			});
			done();
		});
	});
});
