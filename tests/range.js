const { range } = require('../src/index');
require('chai').should();

describe('index', function() {
    it('should return empty list of elements if start and end are equal', function() {
        range(1, 1).should.be.empty;
    });
});
