var expect = require('chai').expect;
require('../models/Gifts');
var gifts = require('../controller/gifts');

describe('test export', function(){
	it ('should be true', function(){
		expect(gifts.test).to.be.true;
	});
});